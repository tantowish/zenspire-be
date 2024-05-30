/*
  Warnings:

  - The values [sangat_baik,baik,biasa,buruk,sangat_buruk] on the enum `Mood` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `no_izin_praktek` on the `practitioners` table. All the data in the column will be lost.
  - You are about to alter the column `nik` on the `practitioners` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(16)`.
  - You are about to drop the `PHQ9` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `question_4` to the `journals` table without a default value. This is not possible if the table is not empty.
  - Made the column `question_3` on table `journals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Mood_new" AS ENUM ('ekstrem', 'berat', 'sedang', 'ringan', 'minimal');
ALTER TABLE "journals" ALTER COLUMN "mood" TYPE "Mood_new" USING ("mood"::text::"Mood_new");
ALTER TYPE "Mood" RENAME TO "Mood_old";
ALTER TYPE "Mood_new" RENAME TO "Mood";
DROP TYPE "Mood_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "PHQ9" DROP CONSTRAINT "PHQ9_user_id_fkey";

-- AlterTable
ALTER TABLE "chat_ai" ADD COLUMN     "ai_analisis" TEXT;

-- AlterTable
ALTER TABLE "discussions" ADD COLUMN     "category" TEXT[];

-- AlterTable
ALTER TABLE "journals" ADD COLUMN     "question_4" TEXT NOT NULL,
ALTER COLUMN "question_3" SET NOT NULL;

-- AlterTable
ALTER TABLE "practitioners" DROP COLUMN "no_izin_praktek",
ADD COLUMN     "no_str" VARCHAR(255),
ALTER COLUMN "nik" SET DATA TYPE VARCHAR(16),
ALTER COLUMN "alamat_praktek" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_datas" ADD COLUMN     "preferences" TEXT[];

-- DropTable
DROP TABLE "PHQ9";
