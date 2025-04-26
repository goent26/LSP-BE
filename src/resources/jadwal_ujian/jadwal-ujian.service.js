const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

module.exports = {
  async getAll(filter) {
    // Create the find options object.
    const findOptions = {
      include: {
        skema: true,
        user: true,
        lampiran: true,
      },
    };

    // Add the filter to the find options.
    if (filter) findOptions.where = { ...filter };

    // Retrieve the jadwal ujian.
    const jadwalUjian = await DB.JadwalUjian.findMany(findOptions);

    return jadwalUjian;
  },

  async getOneById(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
      include: {
        skema: true,
        user: true,
        lampiran: true,
      },
    };

    // Retrieve the jadwal ujian.
    const jadwalUjian = await DB.JadwalUjian.findUnique(findOptions);

    return jadwalUjian;
  },

  async createOne(data) {
    const { pendaftaran_id, waktu_mulai, durasi, ...newData } = data;

    const waktuMulaiDate = new Date(waktu_mulai);

    return await DB.$transaction(async (tx) => {
      // 1. Buat Jadwal Ujian
      const jadwalUjian = await tx.JadwalUjian.create({
        data: {
          ...newData,
          waktu_mulai: waktuMulaiDate,
          waktu_selesai: new Date(waktuMulaiDate.getTime() + durasi * 60000),
          durasi
        },
      });

      console.log('berhasil insert');

      // 2. Insert semua jadwal ujian pendaftar
      const insertedJadwalUjianPendaftar = [];
      for (const id of pendaftaran_id) {
        console.log("id pendaftaran: ", id);
        console.log("id jadwal ujian: ", jadwalUjian.id);
        
        const jadwalUjianPendaftarData = await tx.JadwalUjianPendaftar.create({
          data: {
            jadwal_id: jadwalUjian.id,
            pendaftaran_id: id,
            diskualifikasi: false,
            status_hasil_ujian: "pending",
          },
        });

        insertedJadwalUjianPendaftar.push(jadwalUjianPendaftarData);
      }

      return { jadwalUjian, insertedJadwalUjianPendaftar };
      
    });
  },

  async updateOneById(id, data) {
    // Create the update options object.
    const updateOptions = {
      where: { id },
      data,
    };

    // Update the jadwal ujian.
    const jadwalUjian = await DB.JadwalUjian.update(updateOptions);

    return jadwalUjian;
  },

  async deleteOneById(id) {
    // Create the delete options object.
    const deleteOptions = {
      where: { id },
    };

    // Delete the jadwal ujian.
    const jadwalUjian = await DB.JadwalUjian.delete(deleteOptions);

    return jadwalUjian;
  },

  async isExist(id) {
    const pendaftaran = await DB.Pendaftaran.findUnique({
      where: { id },
    });

    return !!pendaftaran;
  },
};