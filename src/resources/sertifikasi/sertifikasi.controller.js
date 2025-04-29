const service = require('./sertifikasi.service');
const { body, validationResult } = require('express-validator');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  getAll: catchAsync(async (req, res) => {
    // Initialize filter object.
    let filter = undefined;

    // Check if query query contains a property.
    if (req.query) filter = req.query;

    // Get all sertifikasi using service.
    const sertifikasi = await service.getAll(filter);

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'sertifikasi retrieved successfully')
      .setSuccessPayload({
        count: sertifikasi.length,
        data: sertifikasi,
      })
      .send();
  }),

  getOneById: catchAsync(async (req, res, next) => {
    // Get sertifikasi id from request parameters.
    const id = req.params.id;

    // Get sertifikasi using service.
    const sertifikasi = await service.getOneById(id);

    // Check if sertifikasi exists.
    if (!sertifikasi) return next(new AppError('sertifikasi not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'sertifikasi retrieved successfully')
      .setSuccessPayload({
        data: sertifikasi,
      })
      .send();
  }),

  createOne: catchAsync(async (req, res) => {
    const data = req.body;

    await Promise.all([
      body("pendaftaran_id").notEmpty().withMessage("Nama Peserta wajib diisi").run(req),
      body("nomor_sertifikat").notEmpty().withMessage("Nomor Sertifikat wajib diisi").run(req),
      body("tanggal_terbit").notEmpty().withMessage("Tanggal terbit wajib diisi").isISO8601().withMessage("Format tanggal tidak valid (harus ISO-8601)").run(req),
      body("path_file").notEmpty().withMessage("File Sertifikat wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // Create sertifikasi using service.
    const sertifikasi = await service.createOne(data);

    // Send success response.
    return new JsonResponse(res, 201)
      .setMainContent(true, 'sertifikasi created successfully')
      .setSuccessPayload({
        data: sertifikasi,
      })
      .send();
  }),

  updateOneById: catchAsync(async (req, res, next) => {
    // Get sertifikasi id from request parameters.
    const id = req.params.id;

    // Get data from request body.
    const data = req.body;

    await Promise.all([
      body("pendaftaran_id").notEmpty().withMessage("Nama Peserta wajib diisi").run(req),
      body("nomor_sertifikat").notEmpty().withMessage("Nomor Sertifikat wajib diisi").run(req),
      body("tanggal_terbit").notEmpty().withMessage("Tanggal terbit wajib diisi").isISO8601().withMessage("Format tanggal tidak valid (harus ISO-8601)").run(req),
      body("path_file").notEmpty().withMessage("File Sertifikat wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // update sertifikasi using service
    const sertifikasi = await service.updateOneById(id, data);

    // check if sertifikasi exists
    if (!sertifikasi) return next(new AppError('sertifikasi not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'sertifikasi updated successfully')
      .setSuccessPayload({
        data: sertifikasi,
      })
      .send();
  }),

  deleteOneById: catchAsync(async (req, res, next) => {
    // Get sertifikasi id from request parameters.
    const id = req.params.id;

    // Check if sertifikasi exists using service.
    const sertifikasi = await service.isExist(id);

    if (!sertifikasi) return next(new AppError('sertifikasi not found', 404));

    // Delete sertifikasi using service.
    await service.deleteOneById(id);

    // Send success resopnse.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'sertifikasi deleted successfully')
      .setSuccessPayload({
        data: null,
      })
      .send();
  }),
};