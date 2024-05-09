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
        const query = `INSERT INTO comments (post_id, comment_id, profile_id, created_at, updated_at, body)
                   VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
        const values = [
            data.post_id,
            data.comment_id || null, // Assuming comment_id is optional and can be null
            data.profile_id,
            data.created_at || new Date(), // Default to current time if undefined
            data.updated_at || new Date(), // Default to current time if undefined
            data.body,
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        return new Comment(rows[0]);
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
}
exports.Comment = Comment;
exports.default = Comment;
