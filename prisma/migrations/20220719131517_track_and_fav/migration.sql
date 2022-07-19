/*
  Warnings:

  - Added the required column `albumId` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artistId` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "albumId" TEXT NOT NULL,
ADD COLUMN     "artistId" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Fav" (
    "id" TEXT NOT NULL,
    "artists" TEXT[],
    "albums" TEXT[],
    "tracks" TEXT[],

    CONSTRAINT "Fav_pkey" PRIMARY KEY ("id")
);
