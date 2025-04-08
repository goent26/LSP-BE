/**
 * Database class for managing database connections.
 *
 * @class Database
 */
class Database {
  /**
   * The single instance of the Database class.
   *
   * @private
   * @type {Database}
   */
  static #instance;

  /**
   * The database or ORM client object used to interact with the database.
   *
   * @private
   * @type {object}
   */
  #dbClient;

  /**
   * The name of the database.
   *
   * @public
   * @type {string}
   */
  databaseName;

  /**
   * The connection URL for the database.
   *
   * @private
   * @type {string}
   */
  #connectionURL;

  /**
   * Creates an instance of Database.
   *
   * @param {@prisma/client} dbClient - The Prisma Client instance used to interact with the database.
   * @param {object} options - The database connection options.
   * @memberof Database
   */
  constructor(dbClient, options = {}) {
    // Destructure options within the constructor body
    const { databaseURL, databaseName, username, password } = options;

    // If no instance exists, create and store it
    if (!Database.#instance) {
      // Set the databaseName as a public attribute
      this.databaseName = databaseName;

      // Initialize other properties
      this.#dbClient = dbClient;

      // Construct the connection URL
      this.#connectionURL = databaseURL
        .replace('<username>', username)
        .replace('<password>', password)
        .replace('<DB>', databaseName);

      this.DB = null;

      Database.#instance = this;
    }

    // Return the singleton instance
    return Database.#instance;
  }

  /**
   * Connects to the database.
   *
   * @returns {Promise} A promise representing the connection.
   */
  async connect() {
    if (this.DB != null) return this.DB;

    this.DB = new this.#dbClient({
      datasources: {
        db: {
          url: this.#connectionURL,
        },
      },
    });

    return this.DB;
  }

  /**
   * Disconnects from the database.
   *
   * @async
   * @returns {Promise<boolean>} A promise representing the disconnection from the database.
   */
  async disconnect() {
    if (this.DB) await this.DB.$disconnect();
    this.DB = null;
    return true;
  }
}

module.exports = Database;
