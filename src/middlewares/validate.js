// middlewares/validate.js
const { validationResult } = require('express-validator');
const {JsonResponse} = require('../utils')

module.exports = (req, res, next) => {
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return new JsonResponse(res, 400)
      .setMainContent(false, 'Validation failed')
      .setFailedPayload({
        errors: errors.array(),
      })
      .send();
  }
  next();
};
