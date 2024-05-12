/*
  Warnings:

  - A unique constraint covering the columns `[journal_id]` on the table `journal_ai` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `journal_ai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "journal_ai" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "journal_ai_journal_id_key" ON "journal_ai"("journal_id");
