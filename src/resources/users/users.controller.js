const service = require('./users.service');
const { catchAsync, AppError, JsonResponse } = require('../../utils');
const { body, validationResult } = require('express-validator');

module.exports = {
  getAll: catchAsync(async (req, res) => {
    // Initialize filter object.
    let filter = undefined;

    // Check if query query contains a property.
    if (req.query) filter = { ...req.query, role: req.body.role };

    // Get all users using service.
    const users = await service.getAll(filter);

    // Send success response.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'users retrieved successfully')
      .setSuccessPayload({
        count: users.length,
        data: users,
      })
      .send();
  }),

  getOneById: catchAsync(async (req, res, next) => {
    // Get user id from request parameters.
    const id = req.params.id;

    // Get user using service.
    const user = await service.getOneById(id);

    // Check if user exists.
    if (!user) return next(new AppError('user not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'user retrieved successfully')
      .setSuccessPayload({
        data: user,
      })
      .send();
  }),

  createOne: catchAsync(async (req, res) => {
    // Get data from request body.
    const data = req.body;
    await Promise.all([
      body("username").notEmpty().withMessage("Username wajib diisi").run(req),
      body("email").isEmail().withMessage("Email tidak valid").notEmpty().withMessage("Email wajib diisi").run(req),
      body("password").notEmpty().withMessage("Password wajib diisi").run(req),
      body("role").isIn(["asesor", "peserta"]).withMessage("Role tidak valid").run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // Create user using service.
    const user = await service.createOne(data);

    // Send success response.
    return new JsonResponse(res, 201)
      .setMainContent(true, `user ${data.role} created successfully`)
      .setSuccessPayload({
        data: user,
      })
      .send();
  }),

  updateOneById: catchAsync(async (req, res, next) => {
    // Get user id from request parameters.
    const id = req.params.id;

    // Get data from request body.
    const data = req.body;
    await Promise.all([
      body("username").notEmpty().withMessage("Username wajib diisi").run(req),
      body("email").isEmail().withMessage("Email tidak valid").notEmpty().withMessage("Email wajib diisi").run(req),
      body("password").notEmpty().withMessage("Password wajib diisi").run(req),
      body("role").isIn(["asesor", "peserta"]).withMessage("Role tidak valid").run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    // update user using service
    const user = await service.updateOneById(id, data);

    // check if user exists
    if (!user) return next(new AppError('user not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, `user ${data.role} updated successfully`)
      .setSuccessPayload({
        data: user,
      })
      .send();
  }),

  deleteOneById: catchAsync(async (req, res, next) => {
    // Get user id from request parameters.
    const id = req.params.id;

    // Check if user exists using service.
    const user = await service.isExist(id);

    if (!user) return next(new AppError('user not found', 404));

    // Delete user using service.
    await service.deleteOneById(id);

    // Send success resopnse.
    return new JsonResponse(res, 200)
      .setMainContent(true, 'user deleted successfully')
      .setSuccessPayload({
        data: null,
      })
      .send();
  }),
};