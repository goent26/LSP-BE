const service = require('./auth.service');
const controller = require('./auth.controller');
const router = require('./auth.routes');
const { Router } = require('express');

const routes = Router();
routes.use(router);

module.exports = {
  service,
  controller,
  routes,
};