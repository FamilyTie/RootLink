"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.raw(`
    ALTER TABLE posts
    ADD COLUMN img TEXT;
  `);
}
exports.up = up;
async function down(knex) {
    return await knex.raw(`
    ALTER TABLE posts
    DROP COLUMN img;
  `);
}
exports.down = down;
