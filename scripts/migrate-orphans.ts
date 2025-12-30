import { PrismaClient } from "@/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import * as dotenv from "dotenv"

dotenv.config()

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const ROOT_USER_ID = process.env.ROOT_USER_ID

async function calculateUserLevel(userId: string): Promise<number> {
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

async function buildParentPath(userId: string): Promise<string> {
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

async function main() {
    if (!ROOT_USER_ID) {
        throw new Error("ROOT_USER_ID is not defined in environment variables");
    }

    console.log(`Starting migration (rootId: ${ROOT_USER_ID})...`)

    // 1. Find all orphaned users
    const orphans = await prisma.user.findMany({
        where: {
            referredById: null,
            NOT: {
                id: ROOT_USER_ID
            }
        },
        select: {
            id: true,
            name: true
        }
    })

    console.log(`Found ${orphans.length} orphaned users to migrate.`)

    // 2. Assign orphans to root user
    for (const orphan of orphans) {
        console.log(`Assigning ${orphan.name} (ID: ${orphan.id}) to root user...`)
        await prisma.user.update({
            where: { id: orphan.id },
            data: { referredById: ROOT_USER_ID }
        })
    }

    // 3. Recalculate tree for all users
    console.log("Recalculating tree data for all users...")
    const allUsers = await prisma.user.findMany({ select: { id: true } })

    for (const user of allUsers) {
        const level = await calculateUserLevel(user.id)
        const parentPath = await buildParentPath(user.id)

        await prisma.user.update({
            where: { id: user.id },
            data: { level, parentPath }
        })
    }

    // 4. Update child/descendant counts
    console.log("Updating child and descendant counts...")
    for (const user of allUsers) {
        const directChildren = await prisma.user.count({
            where: { referredById: user.id },
        });

        const allDescendants = await prisma.user.count({
            where: {
                parentPath: {
                    startsWith: user.id,
                    not: user.id,
                },
            },
        });

        await prisma.user.update({
            where: { id: user.id },
            data: {
                childCount: directChildren,
                descendantCount: allDescendants,
            },
        });
    }

    console.log("Migration complete!")
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
