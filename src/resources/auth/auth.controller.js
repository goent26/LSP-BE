const service = require('./auth.service');
const { body, validationResult } = require('express-validator');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  register: catchAsync(async (req, res) => {
    const data = req.body;
    await Promise.all([
      body("username").notEmpty().withMessage("Username wajib diisi").run(req),
      body("email").isEmail().withMessage("Email tidak valid").notEmpty().withMessage("Email wajib diisi").run(req),
      body("password").notEmpty().withMessage("Password wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }yield
    

    if ('role' in req.body) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload([{ msg: "Anda tidak diizinkan menentukan role secara manual", param: "role", location: "body" }])
        .send();
    }

    const { user, token } = await service.register(data);

    return new JsonResponse(res, 201)
      .setMainContent(true, 'User registered successfully')
      .setSuccessPayload({ user, token })
      .send();
  }),

  login: catchAsync(async (req, res) => {
    const data = req.body;
    await Promise.all([
      body("email").isEmail().withMessage("Email tidak valid").notEmpty().withMessage("Email wajib diisi").run(req),
      body("password").notEmpty().withMessage("Password wajib diisi").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return new JsonResponse(res, 400)
        .setMainContent(false, "Validasi gagal")
        .setFailedPayload(errors.array())
        .send();
    }

    const { user, token } = await service.login(data);

    return new JsonResponse(res, 200)
      .setMainContent(true, 'Login successful')
      .setSuccessPayload({ user, token })
      .send();
  }),
};