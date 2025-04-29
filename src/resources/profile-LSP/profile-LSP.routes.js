const { Router } = require('express');
const controller = require('./profile-LSP.controller');
const validate = require('../../middlewares/validate');
const { profileLSPValidator } = require('../../validators/profileLSP.validator')
const { verifyToken, restrictTo } = require('../../middlewares/auth');

const router = Router();

router.route('/').get(controller.getAll).post(profileLSPValidator(), validate, verifyToken, restrictTo('admin'), controller.createOne);

router
    .route('/:id')
    .get(controller.getOne)
    .patch(profileLSPValidator(), validate, verifyToken, restrictTo('admin'), controller.updateOneById)
    .delete(verifyToken, restrictTo('admin'), controller.deleteOneById);

module.exports = router;