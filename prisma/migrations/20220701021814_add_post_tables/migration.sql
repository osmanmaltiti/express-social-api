/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `USER` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "POST" (
    "id" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "POST_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LIKE" (
    "id" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LIKE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UNLIKE" (
    "id" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UNLIKE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "COMMENT" (
    "id" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "COMMENT_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "POST_id_key" ON "POST"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LIKE_id_key" ON "LIKE"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UNLIKE_id_key" ON "UNLIKE"("id");

-- CreateIndex
CREATE UNIQUE INDEX "COMMENT_id_key" ON "COMMENT"("id");

-- CreateIndex
CREATE UNIQUE INDEX "USER_username_key" ON "USER"("username");

-- AddForeignKey
ALTER TABLE "POST" ADD CONSTRAINT "POST_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LIKE" ADD CONSTRAINT "LIKE_postId_fkey" FOREIGN KEY ("postId") REFERENCES "POST"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UNLIKE" ADD CONSTRAINT "UNLIKE_postId_fkey" FOREIGN KEY ("postId") REFERENCES "POST"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "COMMENT" ADD CONSTRAINT "COMMENT_postId_fkey" FOREIGN KEY ("postId") REFERENCES "POST"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
