/*
  Warnings:

  - You are about to drop the column `exp` on the `exp` table. All the data in the column will be lost.
  - You are about to drop the column `exp` on the `users` table. All the data in the column will be lost.
  - Added the required column `experience_points` to the `exp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exp" DROP COLUMN "exp",
ADD COLUMN     "experience_points" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "exp",
ADD COLUMN     "experience_points" INTEGER NOT NULL DEFAULT 0;
