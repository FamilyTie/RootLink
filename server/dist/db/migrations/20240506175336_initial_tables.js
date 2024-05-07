"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    // Profiles Table
    await knex.raw(`
        CREATE TABLE profiles (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            username TEXT,
            full_name TEXT,
            bio TEXT,
            account_type TEXT,
            data JSON,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
    // Posts Table
    await knex.raw(`
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY,
            title TEXT,
            body TEXT,
            profile_id INTEGER REFERENCES profiles(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
    // Comments Table
    await knex.raw(`
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY,
            post_id INTEGER REFERENCES posts(id),
            comment_id INTEGER REFERENCES comments(id),
            profile_id INTEGER REFERENCES profiles(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            body TEXT
        );
    `);
    // Post Likes Table
    await knex.raw(`
        CREATE TABLE post_likes (
            id SERIAL PRIMARY KEY,
            profile_id INTEGER REFERENCES profiles(id),
            post_id INTEGER REFERENCES posts(id)
        );
    `);
    // Comment Likes Table
    await knex.raw(`
        CREATE TABLE comment_likes (
            id SERIAL PRIMARY KEY,
            profile_id INTEGER REFERENCES profiles(id),
            comment_id INTEGER REFERENCES comments(id)
        );
    `);
    // Notifications Table
    await knex.raw(`
        CREATE TABLE notifications (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            text TEXT,
            profile_id INTEGER REFERENCES profiles(id),
            read BOOLEAN
        );
    `);
}
exports.up = up;
async function down(knex) {
    await knex.raw('DROP TABLE IF EXISTS notifications');
    await knex.raw('DROP TABLE IF EXISTS comment_likes');
    await knex.raw('DROP TABLE IF EXISTS post_likes');
    await knex.raw('DROP TABLE IF EXISTS comments');
    await knex.raw('DROP TABLE IF EXISTS posts');
    await knex.raw('DROP TABLE IF EXISTS profiles');
}
exports.down = down;
