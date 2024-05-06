import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        CREATE TABLE comment_likes (
        id INTEGER PRIMARY KEY,
        profile_id INTEGER REFERENCES profiles(id),
        comment_id INTEGER REFERENCES comments(id)
       );
       `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`DROP TABLE IF EXISTS comment_likes;`)
}

