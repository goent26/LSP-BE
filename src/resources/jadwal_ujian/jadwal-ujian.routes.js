const { Router } = require('express');
const controller = require('./jadwal-ujian.controller');

const router = Router();

router.route('/').get(controller.getAll).post(controller.createOne);

router
  .route('/:id')
  .get(controller.getOneById)
  .patch(controller.updateOneById)
  .delete(controller.deleteOneById);

module.exports = router;