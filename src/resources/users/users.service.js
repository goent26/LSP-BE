const bcrypt = require('bcryptjs');

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
        profile: true,
      },
    };

    // Add the filter to the find options.
    if (filter) findOptions.where = { ...filter };

    // Retrieve the users.
    const users = await DB.user.findMany(findOptions);

    // Remove password from response
    users.forEach(user => {
      delete user.password;
    });

    return users;
  },

  async getOneById(id, filter) {
    // Create the find options object.
    const findOptions = {
      where: { id },
      include: {
        profile: true,
      },
    };

    // Add the filter to the find options.
    if (filter) findOptions.where = { ...findOptions.where, ...filter };

    // Retrieve the user.
    const user = await DB.user.findUnique(findOptions);

    return user;
  },

  async createOne(data) {
    const { username, email, password, role } = data;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user.
    const user = await DB.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role
      }
    });

    return user;
  },

  async updateOneById(id, data) {
    // Create the update options object.
    const updateOptions = {
      where: { id },
      data,
    };

    // Update the user.
    const user = await DB.user.update(updateOptions);

    return user;
  },

  async deleteOneById(id) {
    // Create the delete options object.
    const deleteOptions = {
      where: { id },
    };

    // Delete the user.
    const user = await DB.user.delete(deleteOptions);

    return user;
  },

  async isExist(id) {
    // Create the find options object.
    const findOptions = {
      where: { id },
    };

    // Retrieve the user.
    const user = await DB.user.findUnique(findOptions);

    return !!user;
  },
};