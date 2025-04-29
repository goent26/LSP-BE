const service = require('./muk.service');
const { body, validationResult } = require('express-validator');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  getAll: catchAsync(async (req, res) => {
    // Initialize filter object.
    let filter = undefined;

    // Check if query query contains a property.
    if (req.query) filter = req.query;

    // Get all muk using service.
    const muk = await service.getAll(filter);

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'muk retrieved successfully')
      .setSuccessPayload({
        count: muk.length,
        data: muk,
      })
      .send();
  }),

  getOneById: catchAsync(async (req, res, next) => {
    // Get muk id from request parameters.
    const id = req.params.id;

    // Get muk using service.
    const muk = await service.getOneById(id);

    // Check if muk exists.
    if (!muk) return next(new AppError('muk not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'muk retrieved successfully')
      .setSuccessPayload({
        data: muk,
      })
      .send();
  }),

  createOne: catchAsync(async (req, res) => {
    const data = req.body;

    await Promise.all([
      body("nama_muk").notEmpty().withMessage("Nama muk wajib diisi").run(req),
      body("deskripsi").notEmpty().withMessage("Deskripsi wajib diisi").run(req),
      body("path_file").notEmpty().withMessage("File wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // Create muk using service.
    const muk = await service.createOne(data);

    // Send success response.
    return new JsonResponse(res, 201)
      .setMainContent(true, 'muk created successfully')
      .setSuccessPayload({
        data: muk,
      })
      .send();
  }),

  updateOneById: catchAsync(async (req, res, next) => {
    // Get muk id from request parameters.
    const id = req.params.id;

    // Get data from request body.
    const data = req.body;

    await Promise.all([
      body("nama_muk").notEmpty().withMessage("Nama muk wajib diisi").run(req),
      body("deskripsi").notEmpty().withMessage("Deskripsi wajib diisi").run(req),
      body("path_file").notEmpty().withMessage("File wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // update muk using service
    const muk = await service.updateOneById(id, data);

    // check if muk exists
    if (!muk) return next(new AppError('muk not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'muk updated successfully')
      .setSuccessPayload({
        data: muk,
      })
      .send();
  }),

  deleteOneById: catchAsync(async (req, res, next) => {
    // Get muk id from request parameters.
    const id = req.params.id;

    // Check if muk exists using service.
    const muk = await service.isExist(id);

    if (!muk) return next(new AppError('muk not found', 404));

    // Delete muk using service.
    await service.deleteOneById(id);

    // Send success resopnse.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'muk deleted successfully')
      .setSuccessPayload({
        data: null,
      })
      .send();
  }),
};