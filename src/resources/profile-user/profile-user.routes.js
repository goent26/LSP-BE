const { Router } = require('express');
const controller = require('./profile-user.controller');
const validate = require('../../middlewares/validate');
const { profileUserValidator } = require('../../validators/profileUser.validator');

const router = Router();

router.route('/')
  .get(controller.getProfileUser)
  .post(profileUserValidator(), validate, controller.postProfileUser)
  .patch(profileUserValidator(), validate, controller.patchProfileUser)
  .delete(controller.deleteProfileUser);

// router
// .route('/:id')
// .get(controller.getOne)
// .patch(createProfileLSPValidator(), validate,controller.updateOneById)
// .delete(controller.deleteOneById);

module.exports = router;