/*
  Warnings:

  - You are about to drop the column `question_4` on the `journals` table. All the data in the column will be lost.
  - Added the required column `judul` to the `journals` table without a default value. This is not possible if the table is not empty.
  - Made the column `question_1` on table `journals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `question_2` on table `journals` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('P', 'L');

-- AlterTable
ALTER TABLE "journals" DROP COLUMN "question_4",
ADD COLUMN     "judul" VARCHAR(20) NOT NULL,
ALTER COLUMN "question_1" SET NOT NULL,
ALTER COLUMN "question_2" SET NOT NULL;

-- CreateTable
CREATE TABLE "UserData" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "health_condition" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalAI" (
    "id" SERIAL NOT NULL,
    "journal_id" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "JournalAI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_user_id_key" ON "UserData"("user_id");

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalAI" ADD CONSTRAINT "JournalAI_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "journals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
