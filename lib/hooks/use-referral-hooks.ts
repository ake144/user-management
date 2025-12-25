import prisma from "@/lib/prisma";
import {
    updateUserTreeData,
    updateChildCount,
    buildParentPath
} from "@/lib/services/referral-service";

/**
 * Hook to be called after a new user signs up via referral
 * Updates the new user's level and parent path, and updates the referrer's child count
 * 
 * Usage: Call this in your signup handler after creating the user
 * 
 * @param userId - The ID of the newly created user
 * @param referrerId - The ID of the user who referred them
 */
export async function onUserReferralSignup(
    userId: string,
    referrerId: string | null
): Promise<void> {
    try {
        // Update the new user's tree data (level and parentPath)
        await updateUserTreeData(userId);

        // If they have a referrer, update the referrer's child count
        if (referrerId) {
            await updateChildCount(referrerId);

            // Also update all ancestors' descendant counts
            await updateAncestorCounts(referrerId);
        }
    } catch (error) {
        console.error("Error updating referral tree data:", error);
        throw error;
    }
}

/**
 * Update descendant counts for all ancestors
 * This is called when a new user joins to update the entire upline
 */
async function updateAncestorCounts(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { parentPath: true },
    });

    if (!user?.parentPath) return;

    const ancestorIds = user.parentPath.split(".");

    // Update descendant count for each ancestor
    for (const ancestorId of ancestorIds) {
        if (ancestorId === userId) continue; // Skip self

        const descendants = await prisma.user.count({
            where: {
                parentPath: {
                    startsWith: ancestorId,
                },
                id: { not: ancestorId },
            },
        });

        await prisma.user.update({
            where: { id: ancestorId },
            data: { descendantCount: descendants },
        });
    }
}

/**
 * Recalculate entire tree structure (use for migrations or data fixes)
 * WARNING: This can be slow for large datasets
 */
export async function recalculateEntireTree(): Promise<void> {
    console.log("Starting tree recalculation...");

    // Get all users
    const users = await prisma.user.findMany({
        select: { id: true, referredById: true },
    });

    console.log(`Found ${users.length} users to process`);

    // Process in batches to avoid overwhelming the database
    const batchSize = 50;
    for (let i = 0; i < users.length; i += batchSize) {
        const batch = users.slice(i, i + batchSize);

        await Promise.all(
            batch.map(async (user) => {
                await updateUserTreeData(user.id);
            })
        );

        console.log(`Processed ${Math.min(i + batchSize, users.length)} / ${users.length} users`);
    }

    // Update all child counts
    console.log("Updating child counts...");
    for (let i = 0; i < users.length; i += batchSize) {
        const batch = users.slice(i, i + batchSize);

        await Promise.all(
            batch.map(async (user) => {
                await updateChildCount(user.id);
            })
        );

        console.log(`Updated counts for ${Math.min(i + batchSize, users.length)} / ${users.length} users`);
    }

    console.log("Tree recalculation complete!");
}

/**
 * Validate tree integrity
 * Checks for orphaned nodes, circular references, etc.
 */
export async function validateTreeIntegrity(): Promise<{
    valid: boolean;
    errors: string[];
}> {
    const errors: string[] = [];

    // Check for circular references
    const users = await prisma.user.findMany({
        select: { id: true, referredById: true, parentPath: true },
    });

    for (const user of users) {
        if (user.referredById) {
            // Check if referrer exists
            const referrer = await prisma.user.findUnique({
                where: { id: user.referredById },
            });

            if (!referrer) {
                errors.push(`User ${user.id} has invalid referredById: ${user.referredById}`);
            }

            // Check for circular reference
            if (user.parentPath?.includes(user.id)) {
                errors.push(`User ${user.id} has circular reference in parentPath`);
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
