/*
  Warnings:

  - You are about to drop the column `judul` on the `journals` table. All the data in the column will be lost.
  - Added the required column `title` to the `journals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "journals" DROP COLUMN "judul",
ADD COLUMN     "title" VARCHAR(20) NOT NULL;
