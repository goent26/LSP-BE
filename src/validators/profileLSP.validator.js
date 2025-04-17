const { body } = require('express-validator')
const { JenisLSP } = require('@prisma/client')
const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

const allowJenisLSP = Object.values(JenisLSP)

const isUnique = (model, field, message) => {
  return body(field).custom(async (value, { req }) => {
    if (!value) {
      throw new Error(`${field} is required`);
    }
    console.log('Custom validator received value:', value);
    console.log('Request body inside custom validator:', req.body);

    const DB = getDB();
    const record = await DB[model].findFirst({
      where: { [field]: value },
    });

    if (record) {
      throw new Error(message || `${field} sudah digunakan`);
    }

    return true;
  });
};
const createProfileLSPValidator = () => [
  body('no_lisensi')
    .notEmpty()
    .withMessage('no lisensi wajib diisi')
    .bail(),
  isUnique('ProfileLSP', 'no_lisensi', 'No Lisensi sudah digunakan'),

  body("no_sk_lisensi")
    .notEmpty()
    .withMessage('no sk lisensi wajib diisi')
    .bail(),
  isUnique('ProfileLSP', 'no_sk_lisensi', 'No SK Lisensi sudah digunakan'),

  body("jenis")
    .notEmpty()
    .withMessage("jenis wajib diisi")
    .isIn(allowJenisLSP)
    .withMessage(`jenis harus salah satu dari ${allowJenisLSP.join(' ,')}`),

]

module.exports = {
  createProfileLSPValidator,
};