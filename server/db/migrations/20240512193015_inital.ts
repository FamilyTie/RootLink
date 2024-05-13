import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    

    //User Table
    await knex.raw(` 
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    //Profile Table
    await knex.raw(`
        CREATE TABLE profiles (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            bio TEXT,
            username TEXT UNIQUE NOT NULL,
            full_name TEXT NOT NULL,
            account_type TEXT DEFAULT 'family',
            img TEXT,
            settings JSONB,
            data JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    //Post Table
    await knex.raw(`
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    //Comment Table
    await knex.raw(`
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
            body TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    //Post Likes Table
    await knex.raw(`
        CREATE TABLE post_likes (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
        );
    `);


    //Comment Likes Table
    await knex.raw(`
        CREATE TABLE comment_likes (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE
        );
    `);

    //Notifications Table
    await knex.raw(`
        CREATE TABLE notifications (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            body TEXT NOT NULL,
            read BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);




    
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`DROP TABLE IF EXISTS users CASCADE`);
    await knex.raw(`DROP TABLE IF EXISTS profiles CASCADE`);
    await knex.raw(`DROP TABLE IF EXISTS posts CASCADE`);
    await knex.raw(`DROP TABLE IF EXISTS comments CASCADE`);
    await knex.raw(`DROP TABLE IF EXISTS post_likes CASCADE`);
    await knex.raw(`DROP TABLE IF EXISTS comment_likes CASCADE`);
    await knex.raw(`DROP TABLE IF EXISTS notifications CASCADE`);

}

