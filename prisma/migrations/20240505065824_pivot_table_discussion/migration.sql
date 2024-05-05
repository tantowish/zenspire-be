-- DropIndex
DROP INDEX "discussion_likes_discussion_id_key";

-- DropIndex
DROP INDEX "discussion_likes_user_id_key";

-- AlterTable
ALTER TABLE "discussion_likes" ADD CONSTRAINT "discussion_likes_pkey" PRIMARY KEY ("user_id", "discussion_id");
