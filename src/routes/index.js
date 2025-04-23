const jadwal = require('../resources/jadwal_ujian');
const tuk = require('../resources/tuk');
const elemen_kuk = require('../resources/elemen_kuk');
const unit = require('../resources/unit');
const skema = require('../resources/skema');
const pendaftaran = require('../resources/pendaftaran');
const users = require('../resources/users');
const auth = require('../resources/auth');
const profileLSP = require('../resources/profile-LSP');

module.exports = (app) => {
  app.use('/api', users.routes);
  app.use('/api', auth.routes);
  app.use('/api', pendaftaran.routes);
  app.use('/api', skema.routes);
  app.use('/api', unit.routes);
  app.use('/api', elemen_kuk.routes);
  app.use('/api', tuk.routes);
  app.use('/api', jadwal.routes);

  app.use('/profile-lsp', profileLSP.routes);

  // app.use('/', (req, res, next) => {
  //    res.status(200).json({
  //      success: true,
  //      message: 'Welcome to the API 👋',
  //    });
  //  });
};
