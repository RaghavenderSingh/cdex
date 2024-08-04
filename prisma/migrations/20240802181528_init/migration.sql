-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Google');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Provider",
ALTER COLUMN "password" DROP NOT NULL;
