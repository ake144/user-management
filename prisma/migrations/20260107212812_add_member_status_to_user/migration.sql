-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('UNVERIFIED', 'BASIC', 'GOLD', 'PREMIUM');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "memberStatus" "MemberStatus" NOT NULL DEFAULT 'UNVERIFIED';
