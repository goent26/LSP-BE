-- DropForeignKey
ALTER TABLE "Pendaftaran" DROP CONSTRAINT "Pendaftaran_jadwal_ujian_id_fkey";

-- AlterTable
ALTER TABLE "Pendaftaran" ALTER COLUMN "jadwal_ujian_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pendaftaran" ADD CONSTRAINT "Pendaftaran_jadwal_ujian_id_fkey" FOREIGN KEY ("jadwal_ujian_id") REFERENCES "JadwalUjian"("id") ON DELETE SET NULL ON UPDATE CASCADE;
