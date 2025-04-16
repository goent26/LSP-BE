const service = require('./elemen_kuk.service');
const controller = require('./elemen_kuk.controller');
const router = require('./elemen_kuk.routes');
const { verifyToken, restrictTo } = require('../../middlewares/auth');
const { Router } = require('express');

const routes = Router();
routes.use('/elemen', verifyToken, restrictTo('admin'), router);

module.exports = {
  service,
  controller,
  routes,
};