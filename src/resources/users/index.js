const service = require('./users.service');
const controller = require('./users.controller');
const router = require('./users.routes');
const { verifyToken, restrictTo } = require('../../middlewares/auth');
const { Router } = require('express');

const routes = Router();
routes.use('/users', verifyToken, restrictTo('admin'), router);

module.exports = {
  service,
  controller,
  routes,
};