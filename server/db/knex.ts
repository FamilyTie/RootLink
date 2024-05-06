const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
export const knex = require('knex')(config);
