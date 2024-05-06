import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        CREATE TABLE notifications (
        id INTEGER PRIMARY KEY,
        created_at TIMESTAMP,
        updated_at TIMESTAMP,
        text TEXT,
        profile_id INTEGER REFERENCES profiles(id),
        read BOOLEAN
       );
       `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`DROP TABLE IF EXISTS notifications;`)
}

