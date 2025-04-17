const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

module.exports = {
  async postPendaftaranApl1(data) {
    const { lampiran, skema_id, ...newData } = data;

    return await DB.$transaction(async (tx) => {
      // 1. Buat Profile Peserta
      const profile_peserta = await tx.ProfileUser.create({
        data: newData,
      });

      // 2. Buat Pendaftaran
      const pendaftaran = await tx.Pendaftaran.create({
        data: {
          status_daftar: "pending",
          tanggal_daftar: new Date(),
          user_id: newData.user_id,
          skema_id: skema_id,
        },
      });

      // 3. Insert semua lampiran
      const insertedLampiran = [];
      for (const item of lampiran) {
        const lampiranData = await tx.LampiranAPL1.create({
          data: {
            nama_dokumen: item.nama_dokumen,
            path_file: item.path_file,
            status_verifikasi: "pending",
            pendaftaran_id: pendaftaran.id,
          },
        });

        insertedLampiran.push(lampiranData);
      }

      return { profile_peserta, pendaftaran, insertedLampiran };
    });
  },
};