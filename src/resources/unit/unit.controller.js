const service = require('./unit.service');
const { body, validationResult } = require('express-validator');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  getAll: catchAsync(async (req, res) => {
    // Initialize filter object.
    let filter = undefined;

    // Check if query query contains a property.
    if (req.query) filter = req.query;

    // Get all unit using service.
    const unit = await service.getAll(filter);

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'unit retrieved successfully')
      .setSuccessPayload({
        count: unit.length,
        data: unit,
      })
      .send();
  }),

  getOneById: catchAsync(async (req, res, next) => {
    // Get unit id from request parameters.
    const id = req.params.id;

    // Get unit using service.
    const unit = await service.getOneById(id);

    // Check if unit exists.
    if (!unit) return next(new AppError('unit not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'unit retrieved successfully')
      .setSuccessPayload({
        data: unit,
      })
      .send();
  }),

  createOne: catchAsync(async (req, res) => {
    const data = req.body;

    await Promise.all([
      body("judul_unit").notEmpty().withMessage("Judul unit wajib diisi").run(req),
      body("kode_unit").notEmpty().withMessage("Kode unit wajib diisi").run(req),
      body("jenis_standar").isIn(["skkni", "standar_internasional", "standar_khusus"]).withMessage("Jenis unit tidak valid").run(req),
      body("skema_id").notEmpty().withMessage("Skema wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // Create unit using service.
    const unit = await service.createOne(data);

    // Send success response.
    return new JsonResponse(res, 201)
      .setMainContent(true, 'unit created successfully')
      .setSuccessPayload({
        data: unit,
      })
      .send();
  }),

  updateOneById: catchAsync(async (req, res, next) => {
    // Get unit id from request parameters.
    const id = req.params.id;

    // Get data from request body.
    const data = req.body;

    await Promise.all([
      body("judul_unit").notEmpty().withMessage("Judul unit wajib diisi").run(req),
      body("kode_unit").notEmpty().withMessage("Kode unit wajib diisi").run(req),
      body("jenis_standar").isIn(["skkni", "standar_internasional", "standar_khusus"]).withMessage("Jenis unit tidak valid").run(req),
      body("skema_id").notEmpty().withMessage("Skema wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // update unit using service
    const unit = await service.updateOneById(id, data);

    // check if unit exists
    if (!unit) return next(new AppError('unit not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'unit updated successfully')
      .setSuccessPayload({
        data: unit,
      })
      .send();
  }),

  deleteOneById: catchAsync(async (req, res, next) => {
    // Get unit id from request parameters.
    const id = req.params.id;

    // Check if unit exists using service.
    const unit = await service.isExist(id);

    if (!unit) return next(new AppError('unit not found', 404));

    // Delete unit using service.
    await service.deleteOneById(id);

    // Send success resopnse.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'unit deleted successfully')
      .setSuccessPayload({
        data: null,
      })
      .send();
  }),
};