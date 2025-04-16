const { Router } = require('express');
const controller = require('./pendaftaran.controller');

const router = Router();

router.post('/profile_peserta', controller.postPeserta);
// router.post('/profile_asesor', controller.postAsesor);
// router.post('/apl1', controller.postApl1);
// router.post('/apl2', controller.postApl2);

// router.route('/').get(controller.getAll).post(controller.createOne);

// router
//   .route('/:id')
//   .get(controller.getOneById)
//   .patch(controller.updateOneById)
//   .delete(controller.deleteOneById);

module.exports = router;