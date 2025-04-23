const { Router } = require('express');
const controller = require('./profile-LSP.controller');
const validate = require('../../middlewares/validate');
const {profileLSPValidator} = require('../../validators/profileLSP.validator')

const router = Router();

router.route('/').get(controller.getAll).post(profileLSPValidator(), validate, controller.createOne);

router
.route('/:id')
.get(controller.getOne)
.patch(profileLSPValidator(), validate,controller.updateOneById)
.delete(controller.deleteOneById);

module.exports = router;