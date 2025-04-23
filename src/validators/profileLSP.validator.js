const { body } = require('express-validator')
const { JenisLSP } = require('@prisma/client')
const { isUnique } = require('./helper.validator')
const allowJenisLSP = Object.values(JenisLSP)

const profileLSPValidator = () => [
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
  profileLSPValidator,
};