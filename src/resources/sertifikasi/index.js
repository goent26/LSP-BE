const service = require('./sertifikasi.service');
const controller = require('./sertifikasi.controller');
const router = require('./sertifikasi.routes');
const { verifyToken, restrictTo } = require('../../middlewares/auth');
const { Router } = require('express');

const routes = Router();
routes.use('/sertifikasi', verifyToken, restrictTo('admin'), router);

module.exports = {
  service,
  controller,
  routes,
};