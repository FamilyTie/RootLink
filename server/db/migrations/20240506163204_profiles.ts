import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
    CREATE TABLE profiles (
        id INTEGER PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        username TEXT,
        full_name TEXT,
        bio TEXT,
        account_type TEXT,
        data JSON, 
        created_at TIMESTAMP,
        updated_at TIMESTAMP
       );
       `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`DROP TABLE IF EXISTS profiles;`)
}

