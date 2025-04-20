const service = require('./muk.service');
const controller = require('./muk.controller');
const router = require('./muk.routes');
const { verifyToken, restrictTo } = require('../../middlewares/auth');
const { Router } = require('express');

const routes = Router();
routes.use('/muk', verifyToken, restrictTo('admin'), router);

module.exports = {
  service,
  controller,
  routes,
};