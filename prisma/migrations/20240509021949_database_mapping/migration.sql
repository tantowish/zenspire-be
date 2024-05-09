/*
  Warnings:

  - You are about to drop the `JournalAI` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JournalAI" DROP CONSTRAINT "JournalAI_journal_id_fkey";

-- DropForeignKey
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_user_id_fkey";

-- DropTable
DROP TABLE "JournalAI";

-- DropTable
DROP TABLE "UserData";

-- CreateTable
CREATE TABLE "user_datas" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "health_condition" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_datas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_ai" (
    "id" SERIAL NOT NULL,
    "journal_id" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "journal_ai_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_datas_user_id_key" ON "user_datas"("user_id");

-- AddForeignKey
ALTER TABLE "user_datas" ADD CONSTRAINT "user_datas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_ai" ADD CONSTRAINT "journal_ai_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "journals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
