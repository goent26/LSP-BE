const service = require('./pendaftaran.service');
const { body, validationResult } = require("express-validator");
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  // function post peserta
  postPeserta: catchAsync(async (req, res) => {
    const reqBody = req.body;

    await Promise.all([
      body("nama_lengkap").notEmpty().withMessage("Nama lengkap wajib diisi").run(req),
      body("NIK").notEmpty().withMessage("NIK/Paspor wajib diisi").run(req),
      body("tempat_lahir").notEmpty().withMessage("Tempat lahir wajib diisi").run(req),
      body("tanggal_lahir").notEmpty().withMessage("Tanggal lahir wajib diisi").isISO8601().withMessage("Format tanggal lahir tidak valid (harus ISO-8601)").run(req),
      body("jenis_kelamin").isIn(["Laki-laki", "Perempuan"]).withMessage("Jenis kelamin tidak valid").run(req),
      body("kebangsaan").notEmpty().withMessage("Kebangsaan wajib diisi").run(req),
      body("alamat").notEmpty().withMessage("Alamat rumah wajib diisi").run(req),
      body("kode_pos").notEmpty().withMessage("Kode pos wajib diisi").run(req),
      body("no_telp").notEmpty().withMessage("Nomor telepon wajib diisi").run(req),
      body("skema_id").notEmpty().withMessage("Skema wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    const user = await service.postPeserta(reqBody);

    return new JsonResponse(res, 201)
      .setMainContent(true, 'user created successfully')
      .setSuccessPayload({ data: user })
      .send();
  }),

  // function post asesor


  // function post apl1


  //function post apl2


};