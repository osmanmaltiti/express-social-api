/*
  Warnings:

  - Added the required column `media` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "media" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "media" TEXT NOT NULL;
