const service = require('./auth.service');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  register: catchAsync(async (req, res) => {
    // Validate role - hanya admin bisa membuat user dengan role selain pendaftar
    // if (req.body.role && req.body.role !== 'pendaftar') {
    //   if (!req.user || req.user.role !== 'admin') {
    //     throw new AppError('Only admin can register non-pendaftar roles', 403);
    //   }
    // }

    const { username, email, password, role } = req.body;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    // const { user, token } = await service.login({ email, password });

    const { user, token } = await service.register({ email, password });

    return new JsonResponse(res, 201)
      .setMainContent(true, 'User registered successfully')
      .setSuccessPayload({ user })
      .send();
  }),

  login: catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const { user, token } = await service.login({ email, password });

    return new JsonResponse(res, 200)
      .setMainContent(true, 'Login successful')
      .setSuccessPayload({ user, token })
      .send();
  }),
};