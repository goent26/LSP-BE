const {body} = require('express-validator')


const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

const isUnique = (model, field, message) => {
  return body(field).custom(async (value, { req }) => {
    if (!value) {
      throw new Error(`${field} is required`);
    }

    const DB = getDB();
    try {
      const record = await DB[model].findFirst({
        where: { [field]: value },
      });

      if (record) {
        throw new Error(message || `${field} sudah digunakan`);
      }
    } catch (error) {
      throw new Error("Terjadi kesalahan saat memeriksa keunikan data.");
    }

    return true;
  });
};

// const isUniqueFromReqUser = () => {
//   return async (req, res, next) => {
//     try {
//       const userId = req.user.id;
//       const DB = getDB();

//       const existing = await DB.ProfileUser.findUnique({
//         where: { user_id: userId },
//       });

//       if (existing) {
//         return res.status(400).json({
//           success: false,
//           message: 'User id sudah memiliki profile',
//         });
//       }

//       next();
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         message: 'Gagal validasi user id',
//         error: err.message,
//       });
//     }
//   };
// };

module.exports = {
  isUnique,
  // isUniqueFromReqUser
};
