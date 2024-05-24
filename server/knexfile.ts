require('dotenv').config();
import * as path from 'path';

const migrationsDirectory = path.join(__dirname, 'db/migrations');
const seedsDirectory = path.join(__dirname, 'db/seeds');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.PG_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false } // Add SSL settings here
    },
    migrations: {
      directory: migrationsDirectory,
    },
    seeds: {
      directory: seedsDirectory,
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.PG_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false } // Add SSL settings here
    },
    migrations: {
      directory: migrationsDirectory,
    },
    seeds: {
      directory: seedsDirectory,
    },
  },
};