-- AlterTable
ALTER TABLE "discussions" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "university" DROP NOT NULL;

-- AlterTable
ALTER TABLE "journals" ALTER COLUMN "question_1" DROP NOT NULL,
ALTER COLUMN "question_2" DROP NOT NULL,
ALTER COLUMN "question_3" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "image" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
