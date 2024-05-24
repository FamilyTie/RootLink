"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.raw(`
    CREATE TABLE connections (
      id SERIAL PRIMARY KEY,
      profile_id1 INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      profile_id2 INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(profile_id1, profile_id2),
      CHECK (profile_id1 <> profile_id2)
    );

    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      lat DOUBLE PRECISION NOT NULL,
      lon DOUBLE PRECISION NOT NULL,
      profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}
exports.up = up;
async function down(knex) {
    await knex.raw(`
    DROP TABLE IF EXISTS connections;
    DROP TABLE IF EXISTS locations;
  `);
}
exports.down = down;
