const service = require('./tuk.service');
const controller = require('./tuk.controller');
const router = require('./tuk.routes');
const { verifyToken, restrictTo } = require('../../middlewares/auth');
const { Router } = require('express');

const routes = Router();
routes.use('/tuk', verifyToken, restrictTo('admin'), router);

module.exports = {
  service,
  controller,
  routes,
};