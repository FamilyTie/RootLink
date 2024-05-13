"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const knex_1 = require("../knex");
class Comment {
    constructor(data) {
        this.id = data.id;
        this.profileId = data.profile_id;
        this.postId = data.post_id;
        this.commentId = data.comment_id;
        this.body = data.body;
        this.createdAt = data.created_at || new Date();
        this.updatedAt = data.updated_at || new Date();
    }
    static async listByPost(last_id, post_id) {
        const query = `SELECT * FROM comments WHERE post_id = ? AND id > ? ORDER BY id DESC LIMIT 20`;
        const { rows } = await knex_1.knex.raw(query, [post_id, last_id]);
        return rows.map((comment) => new Comment(comment));
    }
    static async findById(id) {
        const query = `SELECT * FROM comments WHERE id = ?`;
        const { rows } = await knex_1.knex.raw(query, [id]);
        const comment = rows[0];
        return comment ? new Comment(comment) : null;
    }
    static async create(data) {
        try {
            const query = `INSERT INTO comments (post_id, comment_id, profile_id, created_at, updated_at, body)
                     VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
            const values = [
                data.post_id,
                data.comment_id || null,
                data.profile_id,
                data.created_at || new Date(),
                data.updated_at || new Date(),
                data.body,
            ];
            const { rows } = await knex_1.knex.raw(query, values);
            return new Comment(rows[0]);
        }
        catch (error) {
            console.error("Failed to create a comment:", error);
            // Optionally throw the error further up if handling errors globally
            throw error;
        }
    }
    static async update(id, data) {
        const existingComment = await Comment.findById(id);
        if (!existingComment)
            return null;
        const updatedAt = new Date();
        const query = `UPDATE comments SET body = ?, comment_id = ?, updated_at = ? WHERE id = ? RETURNING *`;
        const values = [
            data.body || existingComment.body,
            data.comment_id || existingComment.commentId,
            updatedAt,
            id,
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        return rows[0] ? new Comment(rows[0]) : null;
    }
    static async findAll(limit = 20) {
        const query = `SELECT * FROM comments ORDER BY created_at DESC LIMIT ?`;
        const { rows } = await knex_1.knex.raw(query, [limit]);
        return rows.map((comment) => new Comment(comment));
    }
}
exports.Comment = Comment;
exports.default = Comment;
