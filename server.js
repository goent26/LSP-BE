require('colors');
const database = require('./src/config');
const createApp = require('./src/app');

const startApp = (database, createApp) => {
  const { NODE_ENV: MODE, PORT = 8000 } = process.env;

  createApp(database).then((app) => {
    app.listen(PORT, () => {
      console.log(
        'App is running in '.brightMagenta.underline.bold.italic +
          MODE.brightYellow.underline.bold.italic +
          ' mode on port '.brightMagenta.underline.bold.italic +
          PORT.brightYellow.underline.bold.italic +
          ' 🚀...'.brightMagenta.underline.bold.italic
      );
    });
  });
};

// Start the application
startApp(database, createApp);
