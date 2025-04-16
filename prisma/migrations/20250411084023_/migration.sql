/*
  Warnings:

  - You are about to drop the column `apl1_id` on the `LampiranAPL1` table. All the data in the column will be lost.
  - You are about to drop the column `NIK` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `APL1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `APL2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `APL2UnitKompetensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PenjadwalanPeserta` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[NIK]` on the table `Pendaftaran` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paspor]` on the table `Pendaftaran` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pendaftaran_id` to the `LampiranAPL1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jadwal_ujian_id` to the `Pendaftaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skema_id` to the `Pendaftaran` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "APL1" DROP CONSTRAINT "APL1_pendaftaran_id_fkey";

-- DropForeignKey
ALTER TABLE "APL2" DROP CONSTRAINT "APL2_pendaftaran_id_fkey";

-- DropForeignKey
ALTER TABLE "APL2UnitKompetensi" DROP CONSTRAINT "APL2UnitKompetensi_apl2_id_fkey";

-- DropForeignKey
ALTER TABLE "LampiranAPL1" DROP CONSTRAINT "LampiranAPL1_apl1_id_fkey";

-- DropForeignKey
ALTER TABLE "PenjadwalanPeserta" DROP CONSTRAINT "PenjadwalanPeserta_jadwal_id_fkey";

-- DropForeignKey
ALTER TABLE "PenjadwalanPeserta" DROP CONSTRAINT "PenjadwalanPeserta_pendaftaran_id_fkey";

-- DropIndex
DROP INDEX "User_NIK_key";

-- AlterTable
ALTER TABLE "LampiranAPL1" DROP COLUMN "apl1_id",
ADD COLUMN     "pendaftaran_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pendaftaran" ADD COLUMN     "NIK" TEXT,
ADD COLUMN     "catatan" TEXT,
ADD COLUMN     "jadwal_ujian_id" TEXT NOT NULL,
ADD COLUMN     "jenis_kelamin" TEXT,
ADD COLUMN     "kebangsaan" TEXT,
ADD COLUMN     "kualifikasi_pendidikan" TEXT,
ADD COLUMN     "paspor" TEXT,
ADD COLUMN     "skema_id" TEXT NOT NULL,
ADD COLUMN     "tanggal_lahir" TIMESTAMP(3),
ADD COLUMN     "tempat_lahir" TEXT,
ADD COLUMN     "tujuan_sertifikasi" TEXT;

-- AlterTable
ALTER TABLE "ProfileLSP" ALTER COLUMN "alamat" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "NIK",
ADD COLUMN     "asal_sekolah" TEXT,
ADD COLUMN     "kompetensi" TEXT,
ADD COLUMN     "masa_berlaku" TIMESTAMP(3);

-- DropTable
DROP TABLE "APL1";

-- DropTable
DROP TABLE "APL2";

-- DropTable
DROP TABLE "APL2UnitKompetensi";

-- DropTable
DROP TABLE "PenjadwalanPeserta";

-- DropEnum
DROP TYPE "StatusKompeten";

-- CreateTable
CREATE TABLE "LampiranAPL2" (
    "id" TEXT NOT NULL,
    "kode_unit" TEXT NOT NULL,
    "nama_unit" TEXT NOT NULL,
    "bukti_pendukung" TEXT,
    "status_pre_asesmen" "StatusPreAsesmen" NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,

    CONSTRAINT "LampiranAPL2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftaran_NIK_key" ON "Pendaftaran"("NIK");

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftaran_paspor_key" ON "Pendaftaran"("paspor");

-- AddForeignKey
ALTER TABLE "Pendaftaran" ADD CONSTRAINT "Pendaftaran_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "Skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pendaftaran" ADD CONSTRAINT "Pendaftaran_jadwal_ujian_id_fkey" FOREIGN KEY ("jadwal_ujian_id") REFERENCES "JadwalUjian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranAPL1" ADD CONSTRAINT "LampiranAPL1_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "Pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranAPL2" ADD CONSTRAINT "LampiranAPL2_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "Pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
