/*
  Warnings:

  - The `health_condition` column on the `user_datas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user_datas" DROP COLUMN "health_condition",
ADD COLUMN     "health_condition" TEXT[];
