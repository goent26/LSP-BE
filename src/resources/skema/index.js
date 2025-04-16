const service = require('./skema.service');
const controller = require('./skema.controller');
const router = require('./skema.routes');
const { verifyToken, restrictTo } = require('../../middlewares/auth');
const { Router } = require('express');

const routes = Router();
routes.use('/skema', verifyToken, restrictTo('admin'), router);

module.exports = {
  service,
  controller,
  routes,
};