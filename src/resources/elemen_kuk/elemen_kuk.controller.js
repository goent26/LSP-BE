const service = require('./elemen_kuk.service');
const { body, validationResult } = require('express-validator');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  getAll: catchAsync(async (req, res) => {
    // Initialize filter object.
    let filter = undefined;

    // Check if query query contains a property.
    if (req.query) filter = req.query;

    // Get all elemen_kuk using service.
    const elemen_kuk = await service.getAll(filter);

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'elemen kuk retrieved successfully')
      .setSuccessPayload({
        count: elemen_kuk.length,
        data: elemen_kuk,
      })
      .send();
  }),

  getOneById: catchAsync(async (req, res, next) => {
    // Get elemen_kuk id from request parameters.
    const id = req.params.id;

    // Get elemen_kuk using service.
    const elemen_kuk = await service.getOneById(id);

    // Check if elemen_kuk exists.
    if (!elemen_kuk) return next(new AppError('elemen kuk not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'elemen kuk retrieved successfully')
      .setSuccessPayload({
        data: elemen_kuk,
      })
      .send();
  }),

  createOne: catchAsync(async (req, res) => {
    const data = req.body;

    await Promise.all([
      body("judul_elemen").notEmpty().withMessage("Judul elemen_kuk wajib diisi").run(req),
      body("kuk").notEmpty().withMessage("Kriteria Unjuk Kerja wajib diisi").run(req),
      body("unit_id").notEmpty().withMessage("Unit wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // Create elemen_kuk using service.
    const elemen_kuk = await service.createOne(data);

    // Send success response.
    return new JsonResponse(res, 201)
      .setMainContent(true, 'elemen_kuk created successfully')
      .setSuccessPayload({
        data: elemen_kuk,
      })
      .send();
  }),

  updateOneById: catchAsync(async (req, res, next) => {
    // Get elemen_kuk id from request parameters.
    const id = req.params.id;

    // Get data from request body.
    const data = req.body;

    await Promise.all([
      body("judul_elemen").notEmpty().withMessage("Judul elemen_kuk wajib diisi").run(req),
      body("kuk").notEmpty().withMessage("Kriteria Unjuk Kerja wajib diisi").run(req),
      body("unit_id").notEmpty().withMessage("Unit wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // update elemen_kuk using service
    const elemen_kuk = await service.updateOneById(id, data);

    // check if elemen_kuk exists
    if (!elemen_kuk) return next(new AppError('elemen kuk not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'elemen kuk updated successfully')
      .setSuccessPayload({
        data: elemen_kuk,
      })
      .send();
  }),

  deleteOneById: catchAsync(async (req, res, next) => {
    // Get elemen_kuk id from request parameters.
    const id = req.params.id;

    // Check if elemen_kuk exists using service.
    const elemen_kuk = await service.isExist(id);

    if (!elemen_kuk) return next(new AppError('elemen kuk not found', 404));

    // Delete elemen_kuk using service.
    await service.deleteOneById(id);

    // Send success resopnse.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'elemen kuk deleted successfully')
      .setSuccessPayload({
        data: null,
      })
      .send();
  }),
};