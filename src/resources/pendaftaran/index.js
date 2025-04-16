const service = require('./pendaftaran.service');
const controller = require('./pendaftaran.controller');
const router = require('./pendaftaran.routes');
const { verifyToken, restrictTo } = require('../../middlewares/auth');
const { Router } = require('express');

const routes = Router();
routes.use('/pendaftaran', verifyToken, restrictTo('peserta'), router);

module.exports = {
  service,
  controller,
  routes,
};