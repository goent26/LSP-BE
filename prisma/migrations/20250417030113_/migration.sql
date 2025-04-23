-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'asesor', 'peserta');

-- CreateEnum
CREATE TYPE "JenisLSP" AS ENUM ('LSP_P1', 'LSP_P2', 'LSP_P3');

-- CreateEnum
CREATE TYPE "StatusDaftar" AS ENUM ('pending', 'diterima', 'ditolak');

-- CreateEnum
CREATE TYPE "StatusVerifikasi" AS ENUM ('memenuhi', 'pending', 'tidak_memenuhi');

-- CreateEnum
CREATE TYPE "StatusPreAsesmen" AS ENUM ('kompeten', 'belum_kompeten');

-- CreateEnum
CREATE TYPE "JenisSkema" AS ENUM ('knni', 'okupasi', 'klaster');

-- CreateEnum
CREATE TYPE "JenisStandar" AS ENUM ('standar_khusus', 'standar_internasional', 'skkni');

-- CreateEnum
CREATE TYPE "JenisTUK" AS ENUM ('sewaktu', 'tetap', 'mandiri');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "ProfileLSP" (
    "id" TEXT NOT NULL,
    "no_sk_lisensi" TEXT NOT NULL,
    "no_lisensi" TEXT NOT NULL,
    "jenis" "JenisLSP" NOT NULL,
    "alamat" TEXT,
    "website_link" TEXT,
    "no_fax" TEXT,
    "no_hp" TEXT,
    "email" TEXT,

    CONSTRAINT "ProfileLSP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pendaftaran" (
    "id" TEXT NOT NULL,
    "status_daftar" "StatusDaftar" NOT NULL,
    "tanggal_daftar" TIMESTAMP(3) NOT NULL,
    "catatan" TEXT,
    "kualifikasi_pendidikan" TEXT,
    "tujuan_sertifikasi" TEXT,
    "ttd_peserta" TEXT,
    "ttd_asesor" TEXT,
    "user_id" TEXT NOT NULL,
    "skema_id" TEXT NOT NULL,
    "jadwal_ujian_id" TEXT,

    CONSTRAINT "Pendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LampiranAPL1" (
    "id" TEXT NOT NULL,
    "nama_dokumen" TEXT,
    "path_file" TEXT,
    "status_verifikasi" "StatusVerifikasi",
    "catatan" TEXT,
    "pendaftaran_id" TEXT NOT NULL,

    CONSTRAINT "LampiranAPL1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LampiranAPL2" (
    "id" TEXT NOT NULL,
    "bukti_pendukung" TEXT,
    "path_file" TEXT,
    "status_pre_asesmen" "StatusPreAsesmen" NOT NULL,
    "catatan" TEXT,
    "status_verifikasi" "StatusVerifikasi",
    "elemen_kuk_id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,

    CONSTRAINT "LampiranAPL2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skema" (
    "id" TEXT NOT NULL,
    "judul_skema" TEXT NOT NULL,
    "nomor_skema" TEXT NOT NULL,
    "jenis" "JenisSkema" NOT NULL,

    CONSTRAINT "Skema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "judul_unit" TEXT NOT NULL,
    "kode_unit" TEXT NOT NULL,
    "jenis_standar" "JenisStandar" NOT NULL,
    "skema_id" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElemenKUK" (
    "id" TEXT NOT NULL,
    "judul_elemen" TEXT NOT NULL,
    "kuk" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,

    CONSTRAINT "ElemenKUK_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TUK" (
    "id" TEXT NOT NULL,
    "nama_tuk" TEXT NOT NULL,
    "kode_tuk" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "jenis" "JenisTUK" NOT NULL,
    "skema_id" TEXT NOT NULL,

    CONSTRAINT "TUK_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JadwalUjian" (
    "id" TEXT NOT NULL,
    "tuk_id" TEXT NOT NULL,
    "tanggal_ujian" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT,
    "kapasitas" INTEGER NOT NULL DEFAULT 24,
    "waktu_mulai" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "waktu_selesai" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JadwalUjian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sertifikat" (
    "id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,
    "nomor_sertifikat" TEXT NOT NULL,
    "tanggal_terbit" TIMESTAMP(3) NOT NULL,
    "path_file" TEXT,

    CONSTRAINT "Sertifikat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileUser_NIK_key" ON "ProfileUser"("NIK");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileUser_no_registrasi_key" ON "ProfileUser"("no_registrasi");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileUser_user_id_key" ON "ProfileUser"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skema_nomor_skema_key" ON "Skema"("nomor_skema");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_kode_unit_key" ON "Unit"("kode_unit");

-- CreateIndex
CREATE UNIQUE INDEX "TUK_kode_tuk_key" ON "TUK"("kode_tuk");

-- CreateIndex
CREATE UNIQUE INDEX "Sertifikat_pendaftaran_id_key" ON "Sertifikat"("pendaftaran_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sertifikat_nomor_sertifikat_key" ON "Sertifikat"("nomor_sertifikat");

-- AddForeignKey
ALTER TABLE "ProfileUser" ADD CONSTRAINT "ProfileUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pendaftaran" ADD CONSTRAINT "Pendaftaran_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "Skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElemenKUK" ADD CONSTRAINT "ElemenKUK_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TUK" ADD CONSTRAINT "TUK_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "Skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalUjian" ADD CONSTRAINT "JadwalUjian_tuk_id_fkey" FOREIGN KEY ("tuk_id") REFERENCES "TUK"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sertifikat" ADD CONSTRAINT "Sertifikat_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "Pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
