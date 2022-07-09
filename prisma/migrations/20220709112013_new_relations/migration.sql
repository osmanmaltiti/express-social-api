/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,userName,fullName]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id", "username", "fullname");

-- CreateIndex
CREATE UNIQUE INDEX "Post_userId_userName_fullName_key" ON "Post"("userId", "userName", "fullName");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_userName_fullName_fkey" FOREIGN KEY ("userId", "userName", "fullName") REFERENCES "User"("id", "username", "fullname") ON DELETE RESTRICT ON UPDATE CASCADE;
