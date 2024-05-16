"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLike = exports.PostLike = void 0;
const knex_1 = require("../knex");
const Post_1 = __importDefault(require("./Post"));
const comment_1 = __importDefault(require("./comment"));
class PostLike {
    constructor(data) {
        this.id = data.id;
        this.postId = data.post_id;
        this.profileId = data.profile_id;
    }
    static async list() {
        const query = `SELECT * FROM post_likes`;
        const { rows } = await knex_1.knex.raw(query);
        return rows.map((postLike) => new PostLike(postLike));
    }
    static async list3() {
        //list only 3 recent likes
        const query = `SELECT * FROM post_likes ORDER BY id DESC LIMIT 3`;
        const { rows } = await knex_1.knex.raw(query);
        return rows.map((postLike) => new PostLike(postLike));
    }
    static async getByPostId(post_id) {
        const query = `SELECT * FROM post_likes WHERE post_id = ?`;
        const { rows } = await knex_1.knex.raw(query, [post_id]);
        return rows.map((postLike) => new PostLike(postLike));
    }
    static async create(data) {
        const query = `INSERT INTO post_likes (post_id, profile_id)
            VALUES (?, ?) RETURNING *`;
        const values = [
            data.post_id,
            data.profile_id
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        Post_1.default.incrementLikes(data.post_id);
        return new PostLike(rows[0]);
    }
    static async delete(profile_id, post_id) {
        const query = `DELETE FROM post_likes WHERE profile_id = ? and post_id = ?`;
        await knex_1.knex.raw(query, [profile_id, post_id]);
        Post_1.default.decrementLikes(post_id);
    }
}
exports.PostLike = PostLike;
class CommentLike {
    constructor(data) {
        this.id = data.id;
        this.commentId = data.comment_id;
        this.profileId = data.profile_id;
    }
    static async list() {
        const query = `SELECT * FROM comment_likes`;
        const { rows } = await knex_1.knex.raw(query);
        return rows.map((commentLike) => new CommentLike(commentLike));
    }
    static async getByCommentId(comment_id) {
        const query = `SELECT * FROM comment_likes WHERE comment_id = ?`;
        const { rows } = await knex_1.knex.raw(query, [comment_id]);
        return rows.map((commentLike) => new CommentLike(commentLike));
    }
    static async create(data) {
        const query = `INSERT INTO comment_likes (comment_id, profile_id)
            VALUES (?, ?) RETURNING *`;
        const values = [
            data.comment_id,
            data.profile_id
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        comment_1.default.incrementLikes(data.comment_id);
        return new CommentLike(rows[0]);
    }
    static async delete(id, comment_id) {
        const query = `DELETE FROM comment_likes WHERE id = ?`;
        await knex_1.knex.raw(query, [id]);
        comment_1.default.decrementLikes(comment_id);
    }
}
exports.CommentLike = CommentLike;
