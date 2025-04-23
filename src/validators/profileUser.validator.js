const { body } = require('express-validator');
const { isUniqueFromReqUser } = require('./helper.validator');
const profileUserValidator = () => [
  body("nama_lengkap")
    .notEmpty()
    .withMessage('Nama lengkap wajib diisi'),
  
  body("masa_berlaku")
    .optional()
    .isISO8601()
    .withMessage("Format masa berlaku tidak valid (harus ISO-8601)"),

  body("tanggal_lahir")
    .optional()
    .isISO8601()
    .withMessage("Format tanggal lahir tidak valid (harus ISO-8601)")
  
  // isUniqueFromReqUser('ProfileUser', 'user_id', 'User id sudah digunakan')
];

module.exports = {
  profileUserValidator
};
