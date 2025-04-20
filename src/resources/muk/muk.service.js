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

    // Retrieve the muks.
    const muks = await DB.MUK.findMany(findOptions);

    return muks;
  },

  async getOneById(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
      include: {
        elemen_kuk: true,
      },
    };

    // Retrieve the muk.
    const muk = await DB.MUK.findUnique(findOptions);

    return muk;
  },

  async createOne(data) {
    // Create the muk.
    const muk = await DB.MUK.create({ data });

    return muk;
  },

  async updateOneById(id, data) {
    // Create the update options object.
    const updateOptions = {
      where: { id },
      data,
    };

    // Update the muk.
    const muk = await DB.MUK.update(updateOptions);

    return muk;
  },

  async deleteOneById(id) {
    // Create the delete options object.
    const deleteOptions = {
      where: { id },
    };

    // Delete the muk.
    const muk = await DB.MUK.delete(deleteOptions);

    return muk;
  },

  async isExist(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
    };

    // Retrieve the muk.
    const muk = await DB.MUK.findUnique(findOptions);

    return !!muk;
  },
};