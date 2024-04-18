/*
  Warnings:

  - You are about to drop the `Exp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Journal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_user_id_fkey";

-- DropTable
DROP TABLE "Exp";

-- DropTable
DROP TABLE "Journal";

-- CreateTable
CREATE TABLE "exp" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "exp" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journals" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "mood" "Mood" NOT NULL,
    "question_1" TEXT NOT NULL,
    "question_2" TEXT NOT NULL,
    "question_3" TEXT NOT NULL,
    "question_4" TEXT NOT NULL,
    "emosi" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "journals" ADD CONSTRAINT "journals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
