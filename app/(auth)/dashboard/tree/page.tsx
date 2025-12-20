import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ReferralTree, TreeNode } from "@/components/referral-tree";
import { Info } from "lucide-react";

// Mock Tree Data
const MOCK_TREE: TreeNode = {
    id: "root",
    name: "You (Root)",
    totalEarnings: 1250.50,
    isActive: true,
    children: [
        {
            id: "u1",
            name: "Alice Johnson",
            totalEarnings: 450.00,
            isActive: true,
            children: [
                {
                    id: "u1-1",
                    name: "Bob Smith",
                    totalEarnings: 120.00,
                    isActive: true,
                    children: []
                },
                {
                    id: "u1-2",
                    name: "Charlie Brown",
                    totalEarnings: 0.00,
                    isActive: false,
                    children: []
                }
            ]
        },
        {
            id: "u2",
            name: "David Wilson",
            totalEarnings: 890.00,
            isActive: true,
            children: [
                {
                    id: "u2-1",
                    name: "Eve Davis",
                    totalEarnings: 340.00,
                    isActive: true,
                    children: [
                        {
                            id: "u2-1-1",
                            name: "Frank Miller",
                            totalEarnings: 50.00,
                            isActive: true,
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: "u3",
            name: "Grace Lee",
            totalEarnings: 0.00,
            isActive: false,
            children: []
        }
    ]
};

async function getReferralTree(userId: string): Promise<TreeNode | null> {
    // Recursive CTE to fetch downline
    // Note: Prisma doesn't support recursive queries natively in findMany, so we use raw query.
    // This query fetches the hierarchy.

    try {
        const rawData: any[] = await prisma.$queryRaw`
      WITH RECURSIVE UserTree AS (
        -- Anchor member: current user
        SELECT 
          id, 
          name, 
          "referredById", 
          "totalEarnings", 
          "isActive", 
          0 as level
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
          ut.level + 1
        FROM users u
        INNER JOIN UserTree ut ON u."referredById" = ut.id
        WHERE ut.level < 5 -- Limit depth
      )
      SELECT * FROM UserTree;
    `;

        if (!rawData || rawData.length === 0) return null;

        // Transform flat list to tree
        const nodeMap = new Map<string, TreeNode>();

        // First pass: Create nodes
        rawData.forEach(row => {
            nodeMap.set(row.id, {
                id: row.id,
                name: row.name || "Unknown",
                totalEarnings: row.totalEarnings || 0,
                isActive: row.isActive,
                children: [],
                level: row.level
            });
        });

        // Second pass: Link children
        let root: TreeNode | null = null;
        rawData.forEach(row => {
            const node = nodeMap.get(row.id)!;
            if (row.id === userId) {
                root = node;
            } else if (row.referredById) {
                const parent = nodeMap.get(row.referredById);
                if (parent) {
                    parent.children?.push(node);
                }
            }
        });

        return root;
    } catch (error) {
        console.error("Error fetching referral tree:", error);
        return null;
    }
}

export default async function TreePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/login");
    }

    const realTree = await getReferralTree(session.user.id);
    const treeData = realTree || MOCK_TREE;
    const isMock = !realTree;

    return (
        <div className="flex flex-col gap-8 h-[calc(100vh-8rem)]">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Referral Network</h1>
                <p className="text-muted-foreground">
                    Visualize your empire. Active members are green, inactive are gray.
                </p>
            </div>

            {isMock && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div className="text-sm text-amber-800 dark:text-amber-200">
                        <p className="font-semibold">Viewing Demo Network</p>
                        <p>You don't have any referrals yet. This is what your network will look like once you start growing!</p>
                    </div>
                </div>
            )}

            <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden relative">
                <div className="absolute inset-0 overflow-auto bg-slate-50/50 dark:bg-slate-950/50">
                    <div className="min-w-max p-8">
                        <ReferralTree data={treeData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
