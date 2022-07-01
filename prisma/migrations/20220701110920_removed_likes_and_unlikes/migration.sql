/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unlike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "Unlike" DROP CONSTRAINT "Unlike_postId_fkey";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Unlike";
