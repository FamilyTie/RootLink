"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.raw(`
    CREATE TABLE chatrooms (
      id SERIAL PRIMARY KEY,
      user1_id INTEGER NOT NULL,
      user2_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user1_id, user2_id)
    );
  `);
    await knex.raw(`
    CREATE TABLE messages (
      id SERIAL PRIMARY KEY,
      chatroom_id INTEGER REFERENCES chatrooms(id) ON DELETE CASCADE,
      user_sent INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      body TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
exports.up = up;
async function down(knex) {
    await knex.raw(`
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS chatrooms;
  `);
}
exports.down = down;
