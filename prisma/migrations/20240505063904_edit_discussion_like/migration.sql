/*
  Warnings:

  - The primary key for the `discussion_likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `discussion_likes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `discussion_likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discussion_id]` on the table `discussion_likes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "discussion_likes" DROP CONSTRAINT "discussion_likes_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "discussion_likes_user_id_key" ON "discussion_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "discussion_likes_discussion_id_key" ON "discussion_likes"("discussion_id");
