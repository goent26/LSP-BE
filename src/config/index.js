const { PrismaClient } = require('@prisma/client');

const Database = require('./Database');

/**
 * Configuration module for the application.
 *
 * @module config/index
 */

// Environment variables
const {
  NODE_ENV: MODE,
  DATABASE_URL_CONFIG,
  DATABASE_DEV,
  DATABASE_PROD,
  DATABASE_TEST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env;

/**
 * Selects the appropriate database connection string based on the application mode.
 *
 * @param {string} MODE - The application mode (e.g., 'development', 'production', 'test').
 * @returns {string} - The selected database connection string.
 */
const selectDB = (MODE) => {
  if (MODE === 'development') return DATABASE_DEV;
  if (MODE === 'production') return DATABASE_PROD;
  return DATABASE_TEST;
};

/**
 * Create a new instance of the Database class for managing database connections.
 *
 * @type {Database}
 */
const database = new Database(PrismaClient, {
  databaseURL: DATABASE_URL_CONFIG,
  databaseName: selectDB(MODE),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
});

/**
 * The configured database instance for the application.
 *
 * @type {Database}
 */
module.exports = database;
