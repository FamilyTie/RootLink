import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE chatrooms (
      id SERIAL PRIMARY KEY,
      user1_id INTEGER NOT NULL,
      user2_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user1_id, user2_id)
    );
  `)

  await knex.raw(`
    CREATE TABLE messages (
      id SERIAL PRIMARY KEY,
      chatroom_id INTEGER REFERENCES chatrooms(id) ON DELETE CASCADE,
      user_sent INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      body TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS chatrooms;
  `)
}
