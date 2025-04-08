-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "NIK" TEXT,
    "no_registrasi" TEXT,
    "no_telp" TEXT,
    "alamat" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileLSP" (
    "id" TEXT NOT NULL,
    "no_ik_lisensi" TEXT NOT NULL,
    "no_lisensi" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "website_link" TEXT,
    "no_fax" TEXT,
    "no_hp" TEXT,
    "email" TEXT,

    CONSTRAINT "ProfileLSP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pendaftaran" (
    "id" TEXT NOT NULL,
    "no_registrasi" TEXT NOT NULL,
    "status_daftar" TEXT NOT NULL,
    "tanggal_daftar" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Pendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APL1" (
    "id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,
    "kode_pos" TEXT,
    "tujuan_sertifikasi" TEXT,
    "tempat_tgl_lahir" TEXT,
    "kebangsaan" TEXT,

    CONSTRAINT "APL1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LampiranAPL1" (
    "id" TEXT NOT NULL,
    "apl1_id" TEXT NOT NULL,
    "nama_dokumen" TEXT NOT NULL,
    "path_file" TEXT NOT NULL,
    "status_verifikasi" TEXT NOT NULL,
    "catatan" TEXT,

    CONSTRAINT "LampiranAPL1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APL2" (
    "id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,
    "skema_id" TEXT NOT NULL,
    "catatan_peserta" TEXT,

    CONSTRAINT "APL2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APL2UnitKompetensi" (
    "id" TEXT NOT NULL,
    "apl2_id" TEXT NOT NULL,
    "kode_unit" TEXT NOT NULL,
    "nama_unit" TEXT NOT NULL,
    "bukti_pendukung" TEXT,
    "status_pre_asesmen" TEXT NOT NULL,

    CONSTRAINT "APL2UnitKompetensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skema" (
    "id" TEXT NOT NULL,
    "nomor_skema" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "okupasi" TEXT,
    "klaster" TEXT,

    CONSTRAINT "Skema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "skema_id" TEXT NOT NULL,
    "judul_unit" TEXT NOT NULL,
    "kode_unit" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElemenKUK" (
    "id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "judul_elemen" TEXT NOT NULL,

    CONSTRAINT "ElemenKUK_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TUK" (
    "id" TEXT NOT NULL,
    "nama_tuk" TEXT NOT NULL,
    "kode_tuk" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,

    CONSTRAINT "TUK_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JadwalUjian" (
    "id" TEXT NOT NULL,
    "skema_id" TEXT NOT NULL,
    "tuk_id" TEXT NOT NULL,
    "tanggal_ujian" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT,
    "status" TEXT NOT NULL,
    "kapasitas" INTEGER NOT NULL DEFAULT 24,
    "waktu_mulai" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "waktu_selesai" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JadwalUjian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenjadwalanPeserta" (
    "id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,
    "jadwal_id" TEXT NOT NULL,
    "status_kompeten" TEXT NOT NULL,
    "catatan" TEXT,

    CONSTRAINT "PenjadwalanPeserta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sertifikat" (
    "id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,
    "nomor_sert" TEXT NOT NULL,
    "tanggal_terbit" TIMESTAMP(3) NOT NULL,
    "path_file" TEXT,

    CONSTRAINT "Sertifikat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_NIK_key" ON "User"("NIK");

-- CreateIndex
CREATE UNIQUE INDEX "User_no_registrasi_key" ON "User"("no_registrasi");

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftaran_no_registrasi_key" ON "Pendaftaran"("no_registrasi");

-- CreateIndex
CREATE UNIQUE INDEX "APL1_pendaftaran_id_key" ON "APL1"("pendaftaran_id");

-- CreateIndex
CREATE UNIQUE INDEX "APL2_pendaftaran_id_key" ON "APL2"("pendaftaran_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skema_nomor_skema_key" ON "Skema"("nomor_skema");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_kode_unit_key" ON "Unit"("kode_unit");

-- CreateIndex
CREATE UNIQUE INDEX "TUK_kode_tuk_key" ON "TUK"("kode_tuk");

-- CreateIndex
CREATE UNIQUE INDEX "Sertifikat_pendaftaran_id_key" ON "Sertifikat"("pendaftaran_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sertifikat_nomor_sert_key" ON "Sertifikat"("nomor_sert");

-- AddForeignKey
ALTER TABLE "Pendaftaran" ADD CONSTRAINT "Pendaftaran_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APL1" ADD CONSTRAINT "APL1_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "Pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranAPL1" ADD CONSTRAINT "LampiranAPL1_apl1_id_fkey" FOREIGN KEY ("apl1_id") REFERENCES "APL1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APL2" ADD CONSTRAINT "APL2_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "Pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APL2UnitKompetensi" ADD CONSTRAINT "APL2UnitKompetensi_apl2_id_fkey" FOREIGN KEY ("apl2_id") REFERENCES "APL2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "Skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElemenKUK" ADD CONSTRAINT "ElemenKUK_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalUjian" ADD CONSTRAINT "JadwalUjian_skema_id_fkey" FOREIGN KEY ("skema_id") REFERENCES "Skema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalUjian" ADD CONSTRAINT "JadwalUjian_tuk_id_fkey" FOREIGN KEY ("tuk_id") REFERENCES "TUK"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenjadwalanPeserta" ADD CONSTRAINT "PenjadwalanPeserta_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "Pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenjadwalanPeserta" ADD CONSTRAINT "PenjadwalanPeserta_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "JadwalUjian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sertifikat" ADD CONSTRAINT "Sertifikat_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "Pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
