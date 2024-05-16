"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const knex_1 = require("../knex");
const Post_1 = __importDefault(require("./Post"));
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
            const query = `INSERT INTO comments (profile_id, post_id, body, comment_id, created_at, updated_at)
                     VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
            const values = [
                data.profile_id,
                data.post_id,
                data.body,
                data.comment_id || null,
                data.created_at || new Date(),
                data.updated_at || new Date(),
            ];
            const { rows } = await knex_1.knex.raw(query, values);
            Post_1.default.incrementComments(data.post_id);
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
    static async delete(id) {
        const query = `DELETE FROM comments WHERE id = ?`;
        await knex_1.knex.raw(query, [id]);
        Post_1.default.decrementComments(id);
    }
    static async decrementLikes(id) {
        const query = `UPDATE comments SET likes = likes - 1 WHERE id = ?`;
        await knex_1.knex.raw(query, [id]);
    }
    static async incrementLikes(id) {
        const query = `UPDATE comments SET likes = likes + 1 WHERE id = ?`;
        await knex_1.knex.raw(query, [id]);
    }
    static async findAll(limit = 20) {
        const query = `SELECT * FROM comments ORDER BY created_at DESC LIMIT ?`;
        const { rows } = await knex_1.knex.raw(query, [limit]);
        return rows.map((comment) => new Comment(comment));
    }
}
exports.Comment = Comment;
exports.default = Comment;
