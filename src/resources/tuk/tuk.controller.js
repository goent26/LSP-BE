const service = require('./tuk.service');
const { body, validationResult } = require('express-validator');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  getAll: catchAsync(async (req, res) => {
    // Initialize filter object.
    let filter = undefined;

    // Check if query query contains a property.
    if (req.query) filter = req.query;

    // Get all tuk using service.
    const tuk = await service.getAll(filter);

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'tuk retrieved successfully')
      .setSuccessPayload({
        count: tuk.length,
        data: tuk,
      })
      .send();
  }),

  getOneById: catchAsync(async (req, res, next) => {
    // Get tuk id from request parameters.
    const id = req.params.id;

    // Get tuk using service.
    const tuk = await service.getOneById(id);

    // Check if tuk exists.
    if (!tuk) return next(new AppError('tuk not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'tuk retrieved successfully')
      .setSuccessPayload({
        data: tuk,
      })
      .send();
  }),

  createOne: catchAsync(async (req, res) => {
    const data = req.body;

    await Promise.all([
      body("nama_tuk").notEmpty().withMessage("Nama TUK wajib diisi").run(req),
      body("kode_tuk").notEmpty().withMessage("Kode TUK wajib diisi").run(req),
      body("alamat").notEmpty().withMessage("Alamat wajib diisi").run(req),
      body("jenis").isIn(["sewaktu", "tetap", "mandiri"]).withMessage("Jenis TUK tidak valid").run(req),
      body("skema_id").notEmpty().withMessage("Skema wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // Create tuk using service.
    const tuk = await service.createOne(data);

    // Send success response.
    return new JsonResponse(res, 201)
      .setMainContent(true, 'TUK created successfully')
      .setSuccessPayload({
        data: tuk,
      })
      .send();
  }),

  updateOneById: catchAsync(async (req, res, next) => {
    // Get tuk id from request parameters.
    const id = req.params.id;

    // Get data from request body.
    const data = req.body;

    await Promise.all([
      body("nama_tuk").notEmpty().withMessage("Nama TUK wajib diisi").run(req),
      body("kode_tuk").notEmpty().withMessage("Kode TUK wajib diisi").run(req),
      body("alamat").notEmpty().withMessage("Alamat wajib diisi").run(req),
      body("jenis").isIn(["sewaktu", "tetap", "mandiri"]).withMessage("Jenis TUK tidak valid").run(req),
      body("skema_id").notEmpty().withMessage("Skema wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // update tuk using service
    const tuk = await service.updateOneById(id, data);

    // check if tuk exists
    if (!tuk) return next(new AppError('TUK not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'TUK updated successfully')
      .setSuccessPayload({
        data: tuk,
      })
      .send();
  }),

  deleteOneById: catchAsync(async (req, res, next) => {
    // Get tuk id from request parameters.
    const id = req.params.id;

    // Check if tuk exists using service.
    const tuk = await service.isExist(id);

    if (!tuk) return next(new AppError('tuk not found', 404));

    // Delete tuk using service.
    await service.deleteOneById(id);

    // Send success resopnse.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'tuk deleted successfully')
      .setSuccessPayload({
        data: null,
      })
      .send();
  }),
};