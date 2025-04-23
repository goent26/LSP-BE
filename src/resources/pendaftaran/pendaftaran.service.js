const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

module.exports = {
  async postPendaftaranApl1(userId, data) {
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
          user_id: userId,
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

  async postPendaftaranApl2(data) {
    const { lampiran, pendaftaran_id } = data;

    return await DB.$transaction(async (tx) => {
      // 1. Insert semua lampiran
      const insertedLampiran = [];
      for (const item of lampiran) {
        const lampiranData = await tx.LampiranAPL2.create({
          data: {
            elemen_kuk_id : item.elemen_kuk_id,
            path_file: item.path_file,
            status_pra_asesmen: item.status_pra_asesmen,
            status_verifikasi: "pending",
            pendaftaran_id: pendaftaran_id,
          },
        });

        insertedLampiran.push(lampiranData);
      }

      return { insertedLampiran };
    });
  },

  async isExist(id) {
    const pendaftaran = await DB.Pendaftaran.findUnique({
      where: { id },
    });

    return !!pendaftaran;
  },
};