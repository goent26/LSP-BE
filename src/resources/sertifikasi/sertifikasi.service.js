const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

module.exports = {
  async getAll(filter) {
    // Create the find options object.
    const findOptions = {
      include: {
        elemen_kuk: true,
      },
    };

    // Add the filter to the find options.
    if (filter) findOptions.where = { ...filter };

    // Retrieve the sertifikasis.
    const sertifikasis = await DB.Sertifikat.findMany(findOptions);

    return sertifikasis;
  },

  async getOneById(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
      include: {
        elemen_kuk: true,
      },
    };

    // Retrieve the sertifikasi.
    const sertifikasi = await DB.Sertifikat.findUnique(findOptions);

    return sertifikasi;
  },

  async createOne(data) {
    // Create the sertifikasi.
    const sertifikasi = await DB.Sertifikat.create({ data });

    return sertifikasi;
  },

  async updateOneById(id, data) {
    // Create the update options object.
    const updateOptions = {
      where: { id },
      data,
    };

    // Update the sertifikasi.
    const sertifikasi = await DB.Sertifikat.update(updateOptions);

    return sertifikasi;
  },

  async deleteOneById(id) {
    // Create the delete options object.
    const deleteOptions = {
      where: { id },
    };

    // Delete the sertifikasi.
    const sertifikasi = await DB.Sertifikat.delete(deleteOptions);

    return sertifikasi;
  },

  async isExist(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
    };

    // Retrieve the sertifikasi.
    const sertifikasi = await DB.Sertifikat.findUnique(findOptions);

    return !!sertifikasi;
  },
};