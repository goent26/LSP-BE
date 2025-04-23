const service = require('./profile-user.service');
const controller = require('./profile-user.controller');
const router = require('./profile-user.routes');
const { Router } = require('express');
const {verifyToken} = require('../../middlewares/auth');

const routes = Router();
routes.use('/profile-user', verifyToken, router);

module.exports = {
  service,
  controller,
  routes,
};