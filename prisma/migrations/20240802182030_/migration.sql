/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `inrwalletId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `solwalletId` on the `User` table. All the data in the column will be lost.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `provider` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "inrwalletId",
DROP COLUMN "solwalletId",
ADD COLUMN     "inrWalletId" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "solWalletId" TEXT,
ADD COLUMN     "sub" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "provider" SET NOT NULL;
