"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../knex");
class Post {
    constructor(data) {
        this.id = data.id;
        this.userId = data.user_id;
        this.title = data.title;
        this.body = data.body;
        this.profileId = data.profile_id;
        this.createdAt = data.created_at || new Date();
        this.updatedAt = data.updated_at || new Date();
    }
    static async list(last_id) {
        const query = `SELECT * FROM posts WHERE id > ? SORT BY id DESC LIMIT 20`;
        const { rows } = await knex_1.knex.raw(query, [last_id]);
        return rows.map((post) => new Post(post));
    }
    static async listByProfile(last_id, profile_id) {
        const query = `SELECT * FROM posts WHERE profile_id = ? SORT BY id DESC LIMIT 20`;
        const { rows } = await knex_1.knex.raw(query, [profile_id]);
        return rows.map((post) => new Post(post));
    }
    static async findById(id) {
        const query = `SELECT * FROM posts WHERE id = ?`;
        const { rows } = await knex_1.knex.raw(query, [id]);
        const post = rows[0];
        return post ? new Post(post) : null;
    }
    static async create(data) {
        const query = `INSERT INTO posts (user_id, title, body, profile_id, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`;
        const values = [
            data.user_id,
            data.title,
            data.body,
            data.profile_id,
            data.created_at || new Date(),
            data.updated_at || new Date()
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        return new Post(rows[0]);
    }
    static async update(id, data) {
        const existingPost = await Post.findById(id);
        if (!existingPost)
            return null;
        const updatedAt = new Date();
        const query = `UPDATE posts SET title = ?, body = ?, updated_at = ? WHERE id = ? RETURNING *`;
        const values = [
            data.title || existingPost.title,
            data.body || existingPost.body,
            updatedAt,
            id,
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        return rows[0] ? new Post(rows[0]) : null;
    }
}
exports.default = Post;
