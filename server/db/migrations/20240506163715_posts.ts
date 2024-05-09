import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE posts (
        id INTEGER PRIMARY KEY,
        title TEXT,
        body TEXT,
        profile_id INTEGER REFERENCES profiles(id),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )
    `);
}

export async function down(knex: Knex): Promise<void> {
    return knex.raw(`DROP TABLE IF EXISTS posts;`);
}
