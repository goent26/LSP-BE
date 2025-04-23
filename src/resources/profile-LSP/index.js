const service = require('./profile-LSP.service');
const controller = require('./profile-LSP.controller');
const router = require('./profile-LSP.routes');
const { Router } = require('express');
const { verifyToken, restrictTo } = require('../../middlewares/auth');

const routes = Router();
routes.use( '/profile-lsp', verifyToken, restrictTo('admin'), router);

module.exports = {
  service,
  controller, 
  routes,
};