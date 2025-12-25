import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import * as dotenv from "dotenv"

dotenv.config()

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const count = await prisma.user.count()
    console.log(`Total users: ${count}`)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
