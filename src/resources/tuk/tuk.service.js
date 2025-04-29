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
      },
    };

    // Add the filter to the find options.
    if (filter) findOptions.where = { ...filter };

    // Retrieve the tuks.
    const tuks = await DB.TUK.findMany(findOptions);

    return tuks;
  },

  async getOneById(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
      include: {
        skema: true,
      },
    };

    // Retrieve the tuk.
    const tuk = await DB.TUK.findUnique(findOptions);

    return tuk;
  },

  async createOne(data) {
    // Create the tuk.
    const tuk = await DB.TUK.create({ data });

    return tuk;
  },

  async updateOneById(id, data) {
    // Create the update options object.
    const updateOptions = {
      where: { id },
      data,
    };

    // Update the tuk.
    const tuk = await DB.TUK.update(updateOptions);

    return tuk;
  },

  async deleteOneById(id) {
    // Create the delete options object.
    const deleteOptions = {
      where: { id },
    };

    // Delete the tuk.
    const tuk = await DB.TUK.delete(deleteOptions);

    return tuk;
  },

  async isExist(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
    };

    // Retrieve the tuk.
    const tuk = await DB.TUK.findUnique(findOptions);

    return !!tuk;
  },

  async countAll(filter) {
    const DB = getDB();
  
    const count = await DB.TUK.count({
      where: filter || {},
    });
  
    return count;
  }  
};