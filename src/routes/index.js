const users = require('../resources/users');
const auth = require('../resources/auth');

module.exports = (app) => {
  app.use('/api', users.routes);
  app.use('/api', auth.routes);

  // app.use('/', (req, res, next) => {
  //   res.status(200).json({
  //     success: true,
  //     message: 'Welcome to the API 👋',
  //   });
  // });
};