const { Router } = require('express');
const controller = require('./pendaftaran.controller');

const router = Router();

router.post('/apl1', controller.postPendaftaranApl1);
router.post('/apl2', controller.postPendaftaranApl2);
// router.post('/profile_asesor', controller.postAsesor);

// router.route('/').get(controller.getAll).post(controller.createOne);

// router
//   .route('/:id')
//   .get(controller.getOneById)
//   .patch(controller.updateOneById)
//   .delete(controller.deleteOneById);

module.exports = router;