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
        elemen_kuk: true,
      },
    };

    // Add the filter to the find options.
    if (filter) findOptions.where = { ...filter };

    // Retrieve the units.
    const units = await DB.unit.findMany(findOptions);

    return units;
  },

  async getOneById(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
      include: {
        elemen_kuk: true,
      },
    };

    // Retrieve the unit.
    const unit = await DB.unit.findUnique(findOptions);

    return unit;
  },

  async createOne(data) {
    // Create the unit.
    const unit = await DB.unit.create({ data });

    return unit;
  },

  async updateOneById(id, data) {
    // Create the update options object.
    const updateOptions = {
      where: { id },
      data,
    };

    // Update the unit.
    const unit = await DB.unit.update(updateOptions);

    return unit;
  },

  async deleteOneById(id) {
    // Create the delete options object.
    const deleteOptions = {
      where: { id },
    };

    // Delete the unit.
    const unit = await DB.unit.delete(deleteOptions);

    return unit;
  },

  async isExist(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
    };

    // Retrieve the unit.
    const unit = await DB.unit.findUnique(findOptions);

    return !!unit;
  },
};