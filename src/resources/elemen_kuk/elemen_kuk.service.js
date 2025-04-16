const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

module.exports = {
  async getAll(filter) {
    const DB = getDB();

    // Create the find options object.
    const findOptions = {
      // include: {
      //   elemenkuk: true,
      // },
    };

    // Add the filter to the find options.
    if (filter) findOptions.where = { ...filter };

    // Retrieve the elemen_kuks.
    const elemen_kuks = await DB.ElemenKUK.findMany(findOptions);

    return elemen_kuks;
  },

  async getOneById(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
      // include: {
      //   elemenkuk: true,
      // },
    };

    // Retrieve the elemen_kuk.
    const elemen_kuk = await DB.ElemenKUK.findUnique(findOptions);

    return elemen_kuk;
  },

  async createOne(data) {
    // Create the elemen_kuk.
    const elemen_kuk = await DB.ElemenKUK.create({ data });

    return elemen_kuk;
  },

  async updateOneById(id, data) {
    // Create the update options object.
    const updateOptions = {
      where: { id },
      data,
    };

    // Update the elemen_kuk.
    const elemen_kuk = await DB.ElemenKUK.update(updateOptions);

    return elemen_kuk;
  },

  async deleteOneById(id) {
    // Create the delete options object.
    const deleteOptions = {
      where: { id },
    };

    // Delete the elemen_kuk.
    const elemen_kuk = await DB.ElemenKUK.delete(deleteOptions);

    return elemen_kuk;
  },

  async isExist(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
    };

    // Retrieve the elemen_kuk.
    const elemen_kuk = await DB.ElemenKUK.findUnique(findOptions);

    return !!elemen_kuk;
  },
};