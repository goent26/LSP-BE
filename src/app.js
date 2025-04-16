// Import dependencies
require('colors');
const express = require('express');
const { middlewaresLoader } = require('./middlewares');
const routes = require('./routes');

async function createApp(database) {
  // Connect to database
  const DB = await database.connect();
  console.log(
    '('.cyan.underline.bold.italic +
    `${database.databaseName}`.brightYellow.underline.bold.italic +
    ') Database Connected 🚀...'.cyan.underline.bold.italic
  );

  // WARN: remove this after you solve db connection with service


  // Create express app
  const app = express();

  middlewaresLoader(app).pre();

  // Mount routes
  routes(app);

  middlewaresLoader(app).post();

  return app;
}

module.exports = createApp;
