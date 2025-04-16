const service = require('./profile-LSP.service');
const controller = require('./profile-LSP.controller');
const router = require('./profile-LSP.routes');
const { Router } = require('express');

const routes = Router();
routes.use(router);

module.exports = {
  service,
  controller, 
  routes,
};