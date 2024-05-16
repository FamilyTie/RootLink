"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../knex");
class Post {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.profileId = data.profile_id;
        this.createdAt = data.created_at || new Date();
        this.updatedAt = data.updated_at || new Date();
        this.img = data.img;
    }
    static async list(lastId) {
        try {
            const query = `
    SELECT 
      posts.id,
      posts.title,
      posts.body,
      posts.img AS post_image,
      profiles.img AS profile_photo,
      profiles.username,
      posts.comments_count,
      posts.likes_count,
      json_agg(json_build_object('profile_id', post_likes.profile_id, 'img', profiles.img) ORDER BY post_likes.id DESC) AS new_likes
    FROM 
      posts
    LEFT JOIN 
      profiles ON posts.profile_id = profiles.id
    LEFT JOIN 
      post_likes ON posts.id = post_likes.post_id
    WHERE 
      posts.id > ?
    GROUP BY 
      posts.id, profiles.id
    ORDER BY 
      posts.id DESC
    LIMIT 
      20
  `;
            const { rows } = await knex_1.knex.raw(query, [lastId]);
            console.log(rows);
            console.log('hello');
            return rows;
        }
        catch (error) {
            throw new Error(`Error fetching posts: ${error.message}`);
        }
    }
    static async listByProfile(last_id, profile_id) {
        const query = `SELECT * FROM posts WHERE profile_id = ? ORDER BY id DESC LIMIT 20`;
        const { rows } = await knex_1.knex.raw(query, [profile_id]);
        return rows.map((post) => new Post(post));
    }
    static async getLikedPostsIds(profile_id) {
        const query = `SELECT post_id FROM post_likes WHERE profile_id = ?`;
        const { rows } = await knex_1.knex.raw(query, [profile_id]);
        const likedPostIds = rows.map((row) => row.post_id);
        return likedPostIds;
    }
    static async findById(id) {
        const query = `SELECT * FROM posts WHERE id = ?`;
        const { rows } = await knex_1.knex.raw(query, [id]);
        const post = rows[0];
        return post ? new Post(post) : null;
    }
    static async create(data) {
        const query = `INSERT INTO posts (profile_id, title, body, created_at, updated_at, img)
            VALUES ( ?, ?, ?, ?, ?, ?) RETURNING *`;
        const values = [
            data.profile_id,
            data.title,
            data.body,
            data.created_at || new Date(),
            data.updated_at || new Date(),
            data.img || null
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
    static async incrementLikes(id) {
        const query = `UPDATE posts SET likes_count = likes_count + 1 WHERE id = ? RETURNING *`;
        const { rows } = await knex_1.knex.raw(query, [id]);
        return rows[0]; // Return the updated row
    }
    static async decrementLikes(id) {
        const query = `UPDATE posts SET likes_count = likes_count - 1 WHERE id = ? RETURNING *`;
        const { rows } = await knex_1.knex.raw(query, [id]);
        return rows[0]; // Return the updated row
    }
    static async incrementComments(id) {
        const query = `UPDATE posts SET comments_count = comments_count + 1 WHERE id = ? RETURNING *`;
        const { rows } = await knex_1.knex.raw(query, [id]);
        return rows[0]; // Return the updated row
    }
    static async decrementComments(id) {
        const query = `UPDATE posts SET comments_count = comments_count - 1 WHERE id = ? RETURNING *`;
        const { rows } = await knex_1.knex.raw(query, [id]);
        return rows[0]; // Return the updated row
    }
}
exports.default = Post;
