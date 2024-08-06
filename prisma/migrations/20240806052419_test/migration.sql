/*
  Warnings:

  - You are about to drop the `InrWallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolWallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InrWallet" DROP CONSTRAINT "InrWallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "SolWallet" DROP CONSTRAINT "SolWallet_userId_fkey";

-- DropTable
DROP TABLE "InrWallet";

-- DropTable
DROP TABLE "SolWallet";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Provider";

-- CreateTable
CREATE TABLE "Model2" (
    "id" SERIAL NOT NULL,
    "model2Name" TEXT NOT NULL,

    CONSTRAINT "Model2_pkey" PRIMARY KEY ("id")
);
