const service = require('./users.service');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  getAll: catchAsync(async (req, res) => {
    // Initialize filter object.
    let filter = undefined;

    // Check if query query contains a property.
    if (req.query) filter = req.query;
    
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
    const id = Number(req.params.id);

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

    // Create user using service.
    const user = await service.createOne(data);

    // Send success response.
    return new JsonResponse(res, 201)
      .setMainContent(true, 'user created successfully')
      .setSuccessPayload({
        data: user,
      })
      .send();
  }),
  
  updateOneById: catchAsync(async (req, res, next) => {
    // Get user id from request parameters.
    const id = Number(req.params.id);

    // Get data from request body.
    const data = req.body;

    // update user using service
    const user = await service.updateOneById(id, data);

    // check if user exists
    if (!user) return next(new AppError('user not found', 404));

    // Send success response
    return new JsonResponse(res, 200)
      .setMainContent(true, 'user updated successfully')
      .setSuccessPayload({
        data: user,
      })
      .send();
  }),
  
  deleteOneById: catchAsync(async (req, res, next) => {
    // Get user id from request parameters.
    const id = Number(req.params.id);

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