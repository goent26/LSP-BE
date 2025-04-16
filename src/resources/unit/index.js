const service = require('./unit.service');
const controller = require('./unit.controller');
const router = require('./unit.routes');
const { verifyToken, restrictTo } = require('../../middlewares/auth');
const { Router } = require('express');

const routes = Router();
routes.use('/unit', verifyToken, restrictTo('admin'), router);

module.exports = {
  service,
  controller,
  routes,
};