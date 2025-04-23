const service = require('./pendaftaran.service');
const serviceSkema = require('../skema/skema.service');
const { body, validationResult } = require("express-validator");
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  // function post pendaftaran apl 1
  postPendaftaranApl1: catchAsync(async (req, res) => {
    const data = req.body;
    const userId = req.user.id;

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
      body("lampiran").isArray().withMessage("Lampiran wajib berupa array").run(req),
    ]);

    // Check if skema exists
    const skema = await serviceSkema.isExist(data.skema_id);
    if (!skema) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload([{ msg: "Skema tidak ditemukan", param: "skema_id", location: "body" }])
        .send();
    }

    // Validasi form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // insert data to service
    const user = await service.postPendaftaranApl1(userId, data);

    return new JsonResponse(res, 201)
      .setMainContent(true, 'Pendaftaran APL 1 berhasil')
      .setSuccessPayload({ data: user })
      .send();
  }),

  //function post apl2
  postPendaftaranApl2: catchAsync(async (req, res) => {
    const data = req.body;

    await Promise.all([
      body("pendaftaran_id").notEmpty().withMessage("Pendaftaran wajib diisi").run(req),
      body("lampiran").isArray().withMessage("Lampiran wajib berupa array").run(req),
    ]);

    // Check if skema exists
    const pendaftaran = await service.isExist(data.pendaftaran_id);
    if (!pendaftaran) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload([{ msg: "Pendaftaran tidak ditemukan", param: "pendaftaran_id", location: "body" }])
        .send();
    }

    // Validasi form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // insert data to service
    const user = await service.postPendaftaranApl2(data);

    return new JsonResponse(res, 201)
      .setMainContent(true, 'Pendaftaran APL 2 berhasil')
      .setSuccessPayload({ data: user })
      .send();
  }),
};