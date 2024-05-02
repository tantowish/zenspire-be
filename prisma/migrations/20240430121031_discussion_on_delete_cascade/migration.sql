-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_discussion_id_fkey";

-- DropForeignKey
ALTER TABLE "discussion_likes" DROP CONSTRAINT "discussion_likes_discussion_id_fkey";

-- AddForeignKey
ALTER TABLE "discussion_likes" ADD CONSTRAINT "discussion_likes_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "discussions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "discussions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
