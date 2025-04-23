const service = require('./jadwal-ujian.service');
const controller = require('./jadwal-ujian.controller');
const router = require('./jadwal-ujian.routes');
const { verifyToken, restrictTo } = require('../../middlewares/auth');
const { Router } = require('express');

const routes = Router();
routes.use('/jadwal-ujian', verifyToken, restrictTo('admin'), router);

module.exports = {
  service,
  controller,
  routes,
}; 