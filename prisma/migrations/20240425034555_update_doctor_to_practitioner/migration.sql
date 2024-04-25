/*
  Warnings:

  - You are about to drop the `doctors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_user_id_fkey";

-- DropTable
DROP TABLE "doctors";

-- CreateTable
CREATE TABLE "practitioners" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "university" VARCHAR(255),
    "no_izin_praktek" VARCHAR(255),
    "no_hp" VARCHAR(255) NOT NULL,
    "nik" VARCHAR(255),
    "alamat_praktek" VARCHAR(255),

    CONSTRAINT "practitioners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "practitioners_user_id_key" ON "practitioners"("user_id");

-- AddForeignKey
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
