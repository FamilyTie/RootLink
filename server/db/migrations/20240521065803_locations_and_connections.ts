import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS connections;
    DROP TABLE IF EXISTS locations;
  `);
}
