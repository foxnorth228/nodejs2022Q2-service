/*
  Warnings:

  - You are about to drop the `Albun` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Albun";

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);
