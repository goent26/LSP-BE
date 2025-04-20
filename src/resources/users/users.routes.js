const { Router } = require('express');
const controller = require('./users.controller');

const router = Router();

const roleMiddleware = (role) => (req, res, next) => {
  req.body.role = role;
  next();
};

router.route('/asesor')
  .get(roleMiddleware('asesor'), controller.getAll)
  .post(roleMiddleware('asesor'), controller.createOne);

router
  .route('/asesor/:id')
  .get(roleMiddleware('asesor'), controller.getOneById)
  .patch(roleMiddleware('asesor'), controller.updateOneById)
  .delete(roleMiddleware('asesor'), controller.deleteOneById);

router.route('/peserta')
  .get(roleMiddleware('peserta'), controller.getAll)
  .post(roleMiddleware('peserta'), controller.createOne);

router
  .route('/peserta/:id')
  .get(roleMiddleware('peserta'), controller.getOneById)
  .patch(roleMiddleware('peserta'), controller.updateOneById)
  .delete(roleMiddleware('peserta'), controller.deleteOneById);

module.exports = router;