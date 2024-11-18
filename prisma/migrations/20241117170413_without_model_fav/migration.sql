/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the `Favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
-- ALTER TABLE "Album" DROP CONSTRAINT "Album_favoritesId_fkey";

-- -- DropForeignKey
-- ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favoritesId_fkey";

-- -- DropForeignKey
-- ALTER TABLE "Track" DROP CONSTRAINT "Track_favoritesId_fkey";

-- -- AlterTable
-- ALTER TABLE "Album" DROP COLUMN "favoritesId",
-- ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- -- AlterTable
-- ALTER TABLE "Artist" DROP COLUMN "favoritesId",
-- ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- -- AlterTable
-- ALTER TABLE "Track" DROP COLUMN "favoritesId",
-- ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- -- AlterTable
-- ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT (EXTRACT(EPOCH FROM now()) * 1000)::bigint,
-- ALTER COLUMN "updatedAt" SET DEFAULT (EXTRACT(EPOCH FROM now()) * 1000)::bigint;

-- -- DropTable
-- DROP TABLE "Favorites";

-- -- AddForeignKey
-- ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Artist" ADD COLUMN "isFavorite" BOOLEAN DEFAULT FALSE;
ALTER TABLE "Album" ADD COLUMN "isFavorite" BOOLEAN DEFAULT FALSE;
ALTER TABLE "Track" ADD COLUMN "isFavorite" BOOLEAN DEFAULT FALSE;