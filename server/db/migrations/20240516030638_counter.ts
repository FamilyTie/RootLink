import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
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


export async function down(knex: Knex): Promise<void> {
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

