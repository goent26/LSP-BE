const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

module.exports = {
  async getAll(filter) {
    const DB = getDB();

    // Create the find options object.
    const findOptions = {
      include: {
        unit: {
          include: {
            elemen_kuk: true,
          },
        },
      },
    };

    // Add the filter to the find options.
    if (filter) findOptions.where = { ...filter };

    // Retrieve the skemas.
    const skemas = await DB.skema.findMany(findOptions);

    return skemas;
  },

  async getOneById(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
      include: {
        unit: {
          include: {
            elemen_kuk: true,
          },
        },
      },
    };

    // Retrieve the skema.
    const skema = await DB.skema.findUnique(findOptions);

    return skema;
  },

  async createOne(data) {
    // Create the skema.
    const skema = await DB.skema.create({ data });

    return skema;
  },

  async updateOneById(id, data) {
    // Create the update options object.
    const updateOptions = {
      where: { id },
      data,
    };

    // Update the skema.
    const skema = await DB.skema.update(updateOptions);

    return skema;
  },

  async deleteOneById(id) {
    // Create the delete options object.
    const deleteOptions = {
      where: { id },
    };

    // Delete the skema.
    const skema = await DB.skema.delete(deleteOptions);

    return skema;
  },

  async isExist(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
    };

    // Retrieve the skema.
    const skema = await DB.skema.findUnique(findOptions);

    return !!skema;
  },
};