const service = require('./users.service');
const controller = require('./users.controller');
const router = require('./users.routes');
const { Router } = require('express');

const routes = Router();
routes.use('/users', router);

module.exports = {
  service,
  controller,
  routes,
};