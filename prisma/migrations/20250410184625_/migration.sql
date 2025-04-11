/*
  Warnings:

  - You are about to drop the column `status` on the `JadwalUjian` table. All the data in the column will be lost.
  - You are about to drop the column `no_ik_lisensi` on the `ProfileLSP` table. All the data in the column will be lost.
  - Changed the type of `status_pre_asesmen` on the `APL2UnitKompetensi` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status_verifikasi` on the `LampiranAPL1` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status_daftar` on the `Pendaftaran` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status_kompeten` on the `PenjadwalanPeserta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `alamat` to the `ProfileLSP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_sk_lisensi` to the `ProfileLSP` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `jenis` on the `ProfileLSP` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jenis` on the `TUK` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'asesor', 'peserta');

-- CreateEnum
CREATE TYPE "JenisLSP" AS ENUM ('LSP_P1', 'LSP_P2', 'LSP_P3');

-- CreateEnum
CREATE TYPE "StatusDaftar" AS ENUM ('pending', 'diterima', 'ditolak');

-- CreateEnum
CREATE TYPE "StatusVerifikasi" AS ENUM ('memenuhi', 'tidak_memenuhi', 'tidak_ada');

-- CreateEnum
CREATE TYPE "StatusPreAsesmen" AS ENUM ('kompeten', 'belum_kompeten');

-- CreateEnum
CREATE TYPE "JenisTUK" AS ENUM ('sewaktu', 'tetap', 'mandiri');

-- CreateEnum
CREATE TYPE "StatusKompeten" AS ENUM ('kompeten', 'belum_kompeten');

-- AlterTable
ALTER TABLE "APL2UnitKompetensi" DROP COLUMN "status_pre_asesmen",
ADD COLUMN     "status_pre_asesmen" "StatusPreAsesmen" NOT NULL;

-- AlterTable
ALTER TABLE "JadwalUjian" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "LampiranAPL1" DROP COLUMN "status_verifikasi",
ADD COLUMN     "status_verifikasi" "StatusVerifikasi" NOT NULL;

-- AlterTable
ALTER TABLE "Pendaftaran" DROP COLUMN "status_daftar",
ADD COLUMN     "status_daftar" "StatusDaftar" NOT NULL;

-- AlterTable
ALTER TABLE "PenjadwalanPeserta" DROP COLUMN "status_kompeten",
ADD COLUMN     "status_kompeten" "StatusKompeten" NOT NULL;

-- AlterTable
ALTER TABLE "ProfileLSP" DROP COLUMN "no_ik_lisensi",
ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "no_sk_lisensi" TEXT NOT NULL,
DROP COLUMN "jenis",
ADD COLUMN     "jenis" "JenisLSP" NOT NULL;

-- AlterTable
ALTER TABLE "TUK" DROP COLUMN "jenis",
ADD COLUMN     "jenis" "JenisTUK" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
