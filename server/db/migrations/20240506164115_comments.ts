import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
    CREATE TABLE comments (
        id INTEGER PRIMARY KEY,
        post_id INTEGER REFERENCES posts(id),
        comment_id INTEGER REFERENCES comments(id),
        profile_id INTEGER REFERENCES profiles(id),
        body TEXT,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`DROP TABLE IF EXISTS comments;`)
}

