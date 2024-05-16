"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.raw(`
    ALTER TABLE posts
    ADD COLUMN likes_count INTEGER DEFAULT 0,
    ADD COLUMN comments_count INTEGER DEFAULT 0;
  `)
        .then(() => {
        return knex.raw(`
      ALTER TABLE comments
      ADD COLUMN likes_count INTEGER DEFAULT 0;
    `);
    });
}
exports.up = up;
async function down(knex) {
    return knex.raw(`
    ALTER TABLE comments
    DROP COLUMN likes_count;
  `)
        .then(() => {
        return knex.raw(`
      ALTER TABLE posts
      DROP COLUMN likes_count,
      DROP COLUMN comments_count;
    `);
    });
}
exports.down = down;
