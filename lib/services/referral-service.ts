import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

/**
 * Get the root user ID from environment variables
 */
export function getRootUserId(): string {
    const rootId = process.env.ROOT_USER_ID;
    if (!rootId) {
        throw new Error("ROOT_USER_ID is not defined in environment variables");
    }
    return rootId;
}

/**
 * Service for managing referral tree operations
 * Optimized for performance with materialized path pattern
 */

export interface TreeStats {
    totalDescendants: number;
    activeDescendants: number;
    totalLevels: number;
    directReferrals: number;
}

/**
 * Calculate user's level in the referral tree
 * Level 0 = no referrer (root node)
 * Level 1 = direct referral from root
 * Level N = N hops from root
 */
export async function calculateUserLevel(userId: string): Promise<number> {
    let level = 0;
    let currentId: string | null = userId;

    while (currentId) {
        const user: { referredById: string | null } | null = await prisma.user.findUnique({
            where: { id: currentId },
            select: { referredById: true },
        });

        if (!user?.referredById) {
            break;
        }

        level++;
        currentId = user.referredById;
    }

    return level;
}

/**
 * Build materialized path for a user (e.g., "0.5.23.67")
 * This enables efficient ancestor/descendant queries
 */
export async function buildParentPath(userId: string): Promise<string> {
    const path: string[] = [];
    let currentId: string | null = userId;

    while (currentId) {
        path.unshift(currentId);

        const user: { referredById: string | null } | null = await prisma.user.findUnique({
            where: { id: currentId },
            select: { referredById: true },
        });

        if (!user?.referredById) {
            break;
        }

        currentId = user.referredById;
    }

    return path.join(".");
}

/**
 * Get upline chain (ancestors) for commission distribution
 * Returns users from direct parent up to maxLevels
 */
export async function getUplineChain(
    userId: string,
    maxLevels: number = 5
): Promise<Array<{ id: string; name: string; email: string; level: number }>> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { parentPath: true, level: true },
    });

    if (!user?.parentPath) {
        return [];
    }

    // Split path and take up to maxLevels
    const pathIds = user.parentPath.split(".");
    const uplineIds = pathIds.slice(Math.max(0, pathIds.length - maxLevels - 1), -1);

    if (uplineIds.length === 0) {
        return [];
    }

    const uplineUsers = await prisma.user.findMany({
        where: { id: { in: uplineIds } },
        select: { id: true, name: true, email: true, level: true },
        orderBy: { level: "desc" }, // Closest first
    });

    return uplineUsers;
}

/**
 * Get downline tree with depth limit for UI display
 * Uses recursive CTE for efficient querying
 */
export async function getDownlineTree(
    userId: string,
    maxDepth: number = 8,
    includeInactive: boolean = false
): Promise<any[]> {
    const activeFilter = includeInactive ? Prisma.empty : Prisma.sql`AND u."isActive" = true`;

    const rawData: any[] = await prisma.$queryRaw`
    WITH RECURSIVE UserTree AS (
      -- Anchor member: current user
      SELECT 
        id, 
        name, 
        "referredById", 
        "totalEarnings", 
        "isActive",
        level as "userLevel",
        "childCount",
        0 as depth
      FROM users
      WHERE id = ${userId}
      
      UNION ALL
      
      -- Recursive member: children
      SELECT 
        u.id, 
        u.name, 
        u."referredById", 
        u."totalEarnings", 
        u."isActive",
        u.level as "userLevel",
        u."childCount",
        ut.depth + 1
      FROM users u
      INNER JOIN UserTree ut ON u."referredById" = ut.id
      WHERE ut.depth < ${maxDepth}
      ${activeFilter}
    )
    SELECT * FROM UserTree
    ORDER BY depth, name;
  `;

    return rawData;
}

/**
 * Update user level and parent path
 * Call this when a new user joins or tree structure changes
 */
export async function updateUserTreeData(userId: string): Promise<void> {
    const level = await calculateUserLevel(userId);
    const parentPath = await buildParentPath(userId);

    await prisma.user.update({
        where: { id: userId },
        data: {
            level,
            parentPath,
        },
    });
}

/**
 * Update child count for a user
 */
export async function updateChildCount(userId: string): Promise<void> {
    const directChildren = await prisma.user.count({
        where: { referredById: userId },
    });

    const allDescendants = await prisma.user.count({
        where: {
            parentPath: {
                startsWith: userId,
                not: userId, // Exclude self
            },
        },
    });

    await prisma.user.update({
        where: { id: userId },
        data: {
            childCount: directChildren,
            descendantCount: allDescendants,
        },
    });
}

/**
 * Get tree statistics for a user
 */
export async function getTreeStats(userId: string): Promise<TreeStats> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            childCount: true,
            descendantCount: true,
            parentPath: true,
        },
    });

    if (!user) {
        return {
            totalDescendants: 0,
            activeDescendants: 0,
            totalLevels: 0,
            directReferrals: 0,
        };
    }

    // Get active descendants
    const activeDescendants = await prisma.user.count({
        where: {
            parentPath: {
                startsWith: userId,
            },
            isActive: true,
            id: { not: userId },
        },
    });

    // Calculate max depth
    const deepestDescendant = await prisma.user.findFirst({
        where: {
            parentPath: {
                startsWith: userId,
            },
            id: { not: userId },
        },
        orderBy: { level: "desc" },
        select: { level: true },
    });

    const currentUserLevel = user.parentPath?.split(".").length || 1;
    const totalLevels = deepestDescendant
        ? deepestDescendant.level - currentUserLevel + 1
        : 0;

    return {
        totalDescendants: user.descendantCount,
        activeDescendants,
        totalLevels,
        directReferrals: user.childCount,
    };
}

/**
 * Transform flat tree data to nested structure for UI
 */
export function transformToNestedTree(flatData: any[]): any {
    if (flatData.length === 0) return null;

    const nodeMap = new Map();

    // First pass: Create nodes
    flatData.forEach((row) => {
        nodeMap.set(row.id, {
            id: row.id,
            name: row.name || "Unknown",
            totalEarnings: row.totalEarnings || 0,
            isActive: row.isActive,
            level: row.userLevel,
            childCount: row.childCount || 0,
            children: [],
        });
    });

    // Second pass: Link children
    let root = null;
    flatData.forEach((row) => {
        const node = nodeMap.get(row.id);
        if (row.depth === 0) {
            root = node;
        } else if (row.referredById) {
            const parent = nodeMap.get(row.referredById);
            if (parent) {
                parent.children.push(node);
            }
        }
    });

    return root;
}
