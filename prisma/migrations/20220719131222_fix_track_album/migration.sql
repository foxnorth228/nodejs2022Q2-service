/*
  Warnings:

  - You are about to drop the column `artistId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "artistId",
DROP COLUMN "name",
DROP COLUMN "year";

-- CreateTable
CREATE TABLE "Albun" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "Albun_pkey" PRIMARY KEY ("id")
);
