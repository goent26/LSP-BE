const service = require('./jadwal-ujian.service');
const serviceTuk = require('../tuk/tuk.service');
const serviceAsesor = require('../users/users.service');
const { body, validationResult } = require("express-validator");
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  getAll: catchAsync(async (req, res) => {
    // Initialize filter object.
    let filter = undefined;

    // Check if query query contains a property.
    if (req.query) filter = req.query;

    // Get all jadwal ujian using service.
    const jadwalUjian = await service.getAll(filter);

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'jadwal ujian retrieved successfully')
      .setSuccessPayload({
        count: jadwalUjian.length,
        data: jadwalUjian,
      })
      .send();
  }),

  getOneById: catchAsync(async (req, res, next) => {
    // Get jadwal ujian id from request parameters.
    const id = req.params.id;

    // Get jadwal ujian using service.
    const jadwalUjian = await service.getOneById(id);

    // Check if jadwal ujian exists.
    if (!jadwalUjian) return next(new AppError('jadwal ujian not found', 404));

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'jadwal ujian retrieved successfully')
      .setSuccessPayload({
        data: jadwalUjian,
      })
      .send();
  }),

  createOne: catchAsync(async (req, res) => {
    const data = req.body;

    await Promise.all([
      body("tuk_id").notEmpty().withMessage("TUK wajib diisi").run(req),
      body("asesor_id").notEmpty().withMessage("Asesor wajib diisi").run(req),
      body("waktu_mulai").notEmpty().withMessage("Waktu mulai wajib diisi").isISO8601().withMessage("Format waktu mulai tidak valid (harus ISO-8601)").run(req),
      body("durasi").isInt().withMessage("Durasi tidak valid").notEmpty().withMessage("Durasi wajib diisi").run(req),
      body("pendaftaran_id").isArray().withMessage("Pendaftaran wajib berupa array").run(req),
    ]);

    // Check if tuk exists
    const tuk = await serviceTuk.isExist(data.tuk_id);
    if (!tuk) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload([{ msg: "TUK tidak ditemukan", param: "tuk_id", location: "body" }])
        .send();
    }

    // Check if tuk exists
    const asesor = await serviceAsesor.getOneById(data.asesor_id, { role: "asesor" });
    if (!asesor) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload([{ msg: "Asesor tidak ditemukan", param: "asesor_id", location: "body" }])
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
    const user = await service.createOne(data);

    return new JsonResponse(res, 201)
      .setMainContent(true, 'jadwal ujian berhasil dibuat')
      .setSuccessPayload({ data: user })
      .send();
  }),

  updateOneById: catchAsync(async (req, res, next) => {
    // Get jadwal ujian id from request parameters.
    const id = req.params.id;

    // Get data from request body.
    const data = req.body;

    // update jadwal ujian using service
    const jadwalUjian = await service.updateOneById(id, data);

    // check if jadwal ujian exists
    if (!jadwalUjian) return next(new AppError('jadwal ujian not found', 404));

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'jadwal ujian updated successfully')
      .setSuccessPayload({
        data: jadwalUjian,
      })
      .send();
  }),

  deleteOneById: catchAsync(async (req, res, next) => {
    // Get jadwal ujian id from request parameters.
    const id = req.params.id;

    // Check if jadwal ujian exists using service.
    const jadwalUjian = await service.isExist(id);

    if (!jadwalUjian) return next(new AppError('jadwal ujian not found', 404));

    // Delete jadwal ujian using service.
    await service.deleteOneById(id);

    // Send success resopnse.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'jadwal ujian deleted successfully')
      .setSuccessPayload({
        data: null,
      })
      .send();
  }),
};