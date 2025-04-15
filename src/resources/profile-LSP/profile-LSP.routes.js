const { Router } = require('express');
const controller = require('./profile-LSP.controller');
const validate = require('../../middlewares/validate');
const {createProfileLSPValidator} = require('../../validators/profileLSP.validator')

const router = Router();

router.route('/').get(controller.getAll).post(createProfileLSPValidator(), validate, controller.createOne);

router
.route('/:id')
.get(controller.getOne)
.patch(createProfileLSPValidator(), validate,controller.updateOneById)
.delete(controller.deleteOneById);

module.exports = router;