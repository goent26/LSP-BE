const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

module.exports = {
  async postPeserta(data) {
    // Ambil skema_id dan pisahkan dari data lainnya
    const { skema_id, ...newData } = data;

    // Buat data peserta
    const profile_peserta = await DB.ProfileUser.create({ data: newData });

    // Jika valid, lanjut buat pendaftaran
    const pendaftaran = await DB.Pendaftaran.create({
      data:
      {
        status_daftar: "pending",
        tanggal_daftar: new Date(),
        user_id: newData.user_id,
        skema_id
      }
    });

    return { profile_peserta, pendaftaran };
  }
};