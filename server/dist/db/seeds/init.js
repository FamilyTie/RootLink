"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
    // Before you have models you can always just do `await knex('table_name').del`
    await knex('users').del();
    await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await User_1.default.create('cool_cat', '1234');
    await User_1.default.create('l33t-guy', '1234');
    await User_1.default.create('wowow', '1234');
};
