"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
exports.knex = require('knex')(config);
