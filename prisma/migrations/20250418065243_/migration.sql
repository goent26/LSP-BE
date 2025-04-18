/*
  Warnings:

  - You are about to drop the column `skema_id` on the `JadwalUjian` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `JadwalUjian` table. All the data in the column will be lost.
  - You are about to drop the column `apl1_id` on the `LampiranAPL1` table. All the data in the column will be lost.
  - The `status_verifikasi` column on the `LampiranAPL1` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `no_registrasi` on the `Pendaftaran` table. All the data in the column will be lost.
  - You are about to drop the column `no_ik_lisensi` on the `ProfileLSP` table. All the data in the column will be lost.
  - You are about to drop the column `nomor_sert` on the `Sertifikat` table. All the data in the column will be lost.
  - You are about to drop the column `klaster` on the `Skema` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Skema` table. All the data in the column will be lost.
  - You are about to drop the column `okupasi` on the `Skema` table. All the data in the column will be lost.
  - You are about to drop the column `NIK` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `alamat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nama_lengkap` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `no_registrasi` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `no_telp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `APL1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `APL2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `APL2UnitKompetensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PenjadwalanPeserta` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nomor_sertifikat]` on the table `Sertifikat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kuk` to the `ElemenKUK` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendaftaran_id` to the `LampiranAPL1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skema_id` to the `Pendaftaran` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status_daftar` on the `Pendaftaran` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `no_sk_lisensi` to the `ProfileLSP` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `jenis` on the `ProfileLSP` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `nomor_sertifikat` to the `Sertifikat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judul_skema` to the `Skema` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `jenis` on the `Skema` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `skema_id` to the `TUK` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `jenis` on the `TUK` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `jenis_standar` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'asesor', 'peserta');

-- CreateEnum
CREATE TYPE "JenisLSP" AS ENUM ('LSP_P1', 'LSP_P2', 'LSP_P3');

-- CreateEnum
CREATE TYPE "StatusDaftar" AS ENUM ('pending', 'diterima', 'ditolak');

-- CreateEnum
CREATE TYPE "StatusVerifikasi" AS ENUM ('memenuhi', 'pending', 'tidak_memenuhi');

-- CreateEnum
CREATE TYPE "StatusPraAsesmen" AS ENUM ('kompeten', 'belum_kompeten');

-- CreateEnum
CREATE TYPE "JenisSkema" AS ENUM ('knni', 'okupasi', 'klaster');

-- CreateEnum
CREATE TYPE "JenisStandar" AS ENUM ('standar_khusus', 'standar_internasional', 'skkni');

-- CreateEnum
CREATE TYPE "JenisTUK" AS ENUM ('sewaktu', 'tetap', 'mandiri');

-- DropForeignKey
ALTER TABLE "APL1" DROP CONSTRAINT "APL1_pendaftaran_id_fkey";

-- DropForeignKey
ALTER TABLE "APL2" DROP CONSTRAINT "APL2_pendaftaran_id_fkey";

-- DropForeignKey
ALTER TABLE "APL2UnitKompetensi" DROP CONSTRAINT "APL2UnitKompetensi_apl2_id_fkey";

-- DropForeignKey
ALTER TABLE "JadwalUjian" DROP CONSTRAINT "JadwalUjian_skema_id_fkey";

-- DropForeignKey
ALTER TABLE "LampiranAPL1" DROP CONSTRAINT "LampiranAPL1_apl1_id_fkey";

-- DropForeignKey
ALTER TABLE "PenjadwalanPeserta" DROP CONSTRAINT "PenjadwalanPeserta_jadwal_id_fkey";

-- DropForeignKey
ALTER TABLE "PenjadwalanPeserta" DROP CONSTRAINT "PenjadwalanPeserta_pendaftaran_id_fkey";

-- DropIndex
DROP INDEX "Pendaftaran_no_registrasi_key";

-- DropIndex
DROP INDEX "Sertifikat_nomor_sert_key";

-- DropIndex
DROP INDEX "User_NIK_key";

-- DropIndex
DROP INDEX "User_no_registrasi_key";

-- AlterTable
ALTER TABLE "ElemenKUK" ADD COLUMN     "kuk" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JadwalUjian" DROP COLUMN "skema_id",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "LampiranAPL1" DROP COLUMN "apl1_id",
ADD COLUMN     "pendaftaran_id" TEXT NOT NULL,
ALTER COLUMN "nama_dokumen" DROP NOT NULL,
ALTER COLUMN "path_file" DROP NOT NULL,
DROP COLUMN "status_verifikasi",
ADD COLUMN     "status_verifikasi" "StatusVerifikasi";

-- AlterTable
ALTER TABLE "Pendaftaran" DROP COLUMN "no_registrasi",
ADD COLUMN     "catatan" TEXT,
ADD COLUMN     "jadwal_ujian_id" TEXT,
ADD COLUMN     "kualifikasi_pendidikan" TEXT,
ADD COLUMN     "skema_id" TEXT NOT NULL,
ADD COLUMN     "ttd_asesor" TEXT,
ADD COLUMN     "ttd_peserta" TEXT,
ADD COLUMN     "tujuan_sertifikasi" TEXT,
DROP COLUMN "status_daftar",
ADD COLUMN     "status_daftar" "StatusDaftar" NOT NULL;

-- AlterTable
ALTER TABLE "ProfileLSP" DROP COLUMN "no_ik_lisensi",
ADD COLUMN     "alamat" TEXT,
ADD COLUMN     "no_sk_lisensi" TEXT NOT NULL,
DROP COLUMN "jenis",
ADD COLUMN     "jenis" "JenisLSP" NOT NULL;

-- AlterTable
ALTER TABLE "Sertifikat" DROP COLUMN "nomor_sert",
ADD COLUMN     "nomor_sertifikat" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Skema" DROP COLUMN "klaster",
DROP COLUMN "nama",
DROP COLUMN "okupasi",
ADD COLUMN     "judul_skema" TEXT NOT NULL,
DROP COLUMN "jenis",
ADD COLUMN     "jenis" "JenisSkema" NOT NULL;

-- AlterTable
ALTER TABLE "TUK" ADD COLUMN     "skema_id" TEXT NOT NULL,
DROP COLUMN "jenis",
ADD COLUMN     "jenis" "JenisTUK" NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "jenis_standar" "JenisStandar" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "NIK",
DROP COLUMN "alamat",
DROP COLUMN "nama_lengkap",
DROP COLUMN "no_registrasi",
DROP COLUMN "no_telp",
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "APL1";

-- DropTable
DROP TABLE "APL2";

-- DropTable
DROP TABLE "APL2UnitKompetensi";

-- DropTable
DROP TABLE "PenjadwalanPeserta";

-- CreateTable
CREATE TABLE "ProfileUser" (
    "id" TEXT NOT NULL,
    "NIK" TEXT,
    "no_registrasi" TEXT,
    "user_id" TEXT NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "asal_sekolah" TEXT,
    "kompetensi" TEXT,
    "PNS" TEXT,
    "masa_berlaku" TIMESTAMP(3),
    "kebangsaan" TEXT,
    "tempat_lahir" TEXT,
    "tanggal_lahir" TIMESTAMP(3),
    "jenis_kelamin" TEXT,
    "alamat" TEXT,
    "kode_pos" TEXT,
    "no_telp" TEXT,

    CONSTRAINT "ProfileUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LampiranAPL2" (
    "id" TEXT NOT NULL,
    "path_file" TEXT,
    "status_pra_asesmen" "StatusPraAsesmen" NOT NULL,
    "catatan" TEXT,
    "status_verifikasi" "StatusVerifikasi",
    "elemen_kuk_id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,

    CONSTRAINT "LampiranAPL2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileUser_NIK_key" ON "ProfileUser"("NIK");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileUser_no_registrasi_key" ON "ProfileUser"("no_registrasi");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileUser_user_id_key" ON "ProfileUser"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sertifikat_nomor_sertifikat_key" ON "Sertifikat"("nomor_sertifikat");

-- AddForeignKey
ALTER TABLE "ProfileUser" ADD CONSTRAINT "ProfileUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pendaftaran" ADD CONSTRAINT "Pendaftaran_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "Skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pendaftaran" ADD CONSTRAINT "Pendaftaran_jadwal_ujian_id_fkey" FOREIGN KEY ("jadwal_ujian_id") REFERENCES "JadwalUjian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranAPL1" ADD CONSTRAINT "LampiranAPL1_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "Pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranAPL2" ADD CONSTRAINT "LampiranAPL2_elemen_kuk_id_fkey" FOREIGN KEY ("elemen_kuk_id") REFERENCES "ElemenKUK"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranAPL2" ADD CONSTRAINT "LampiranAPL2_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "Pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TUK" ADD CONSTRAINT "TUK_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "Skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
