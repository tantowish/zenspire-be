/*
  Warnings:

  - The values [happy,relaxed,indifferent,sad,angry] on the enum `Mood` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Mood_new" AS ENUM ('sangat_baik', 'baik', 'biasa', 'buruk', 'sangat_buruk');
ALTER TABLE "journals" ALTER COLUMN "mood" TYPE "Mood_new" USING ("mood"::text::"Mood_new");
ALTER TYPE "Mood" RENAME TO "Mood_old";
ALTER TYPE "Mood_new" RENAME TO "Mood";
DROP TYPE "Mood_old";
COMMIT;
