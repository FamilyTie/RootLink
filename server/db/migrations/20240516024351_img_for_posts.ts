import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.raw(`
    ALTER TABLE posts
    ADD COLUMN img TEXT;
  `);
}


export async function down(knex: Knex): Promise<void> {
    return await knex.raw(`
    ALTER TABLE posts
    DROP COLUMN img;
  `);
}

