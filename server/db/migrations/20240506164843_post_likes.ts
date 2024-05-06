import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        CREATE TABLE post_likes (
        id INTEGER PRIMARY KEY,
        profile_id INTEGER REFERENCES profiles(id),
        post_id INTEGER REFERENCES posts(id)
       );
       `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`DROP TABLE IF EXISTS post_likes;`)
}

