const service = require('./skema.service');
const { body, validationResult } = require('express-validator');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  getAll: catchAsync(async (req, res) => {
    // Initialize filter object.
    let filter = undefined;

    // Check if query query contains a property.
    if (req.query) filter = req.query;

    // Get all skema using service.
    const skema = await service.getAll(filter);

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'skema retrieved successfully')
      .setSuccessPayload({
        count: skema.length,
        data: skema,
      })
      .send();
  }),

  getOneById: catchAsync(async (req, res, next) => {
    // Get skema id from request parameters.
    const id = req.params.id;

    // Get skema using service.
    const skema = await service.getOneById(id);

    // Check if skema exists.
    if (!skema) return next(new AppError('skema not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'skema retrieved successfully')
      .setSuccessPayload({
        data: skema,
      })
      .send();
  }),

  createOne: catchAsync(async (req, res) => {
    const data = req.body;

    await Promise.all([
      body("judul_skema").notEmpty().withMessage("Judul Skema wajib diisi").run(req),
      body("nomor_skema").notEmpty().withMessage("Nomor Skema wajib diisi").run(req),
      body("jenis").isIn(["knni", "okupasi", "klaster"]).withMessage("Jenis Skema tidak valid").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // Create skema using service.
    const skema = await service.createOne(data);

    // Send success response.
    return new JsonResponse(res, 201)
      .setMainContent(true, 'skema created successfully')
      .setSuccessPayload({
        data: skema,
      })
      .send();
  }),

  updateOneById: catchAsync(async (req, res, next) => {
    // Get skema id from request parameters.
    const id = req.params.id;

    console.log(id);

    // Get data from request body.
    const data = req.body;

    await Promise.all([
      body("judul_skema").notEmpty().withMessage("Judul Skema wajib diisi").run(req),
      body("nomor_skema").notEmpty().withMessage("Nomor Skema wajib diisi").run(req),
      body("jenis").isIn(["knni", "okupasi", "klaster"]).withMessage("Jenis Skema tidak valid").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // update skema using service
    const skema = await service.updateOneById(id, data);

    // check if skema exists
    if (!skema) return next(new AppError('skema not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'skema updated successfully')
      .setSuccessPayload({
        data: skema,
      })
      .send();
  }),

  deleteOneById: catchAsync(async (req, res, next) => {
    // Get skema id from request parameters.
    const id = req.params.id;

    // Check if skema exists using service.
    const skema = await service.isExist(id);

    if (!skema) return next(new AppError('skema not found', 404));

    // Delete skema using service.
    await service.deleteOneById(id);

    // Send success resopnse.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'skema deleted successfully')
      .setSuccessPayload({
        data: null,
      })
      .send();
  }),
};