"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../knex");
class SearchService {
    static async search(query) {
        try {
            const postsQuery = `
      SELECT 
        'post' AS type,
        posts.id,
        posts.title,
        posts.body,
        posts.img AS post_image,
        profiles.img AS profile_photo,
        profiles.username,
        posts.comments_count,
        posts.likes_count,
        json_agg(json_build_object('profile_id', post_likes.profile_id, 'img', liker_profiles.img) ORDER BY post_likes.id DESC) AS new_likes
      FROM 
        posts
      LEFT JOIN 
        profiles ON posts.profile_id = profiles.id
      LEFT JOIN 
        post_likes ON posts.id = post_likes.post_id
      LEFT JOIN 
        profiles AS liker_profiles ON post_likes.profile_id = liker_profiles.id
      WHERE 
        posts.title ILIKE ?
      GROUP BY 
        posts.id, profiles.id
      ORDER BY 
        posts.id DESC
      LIMIT 
        20
    `;
            const profilesQuery = `
        SELECT 
          'profile' AS type,
          profiles.id,
          profiles.full_name,
          profiles.username,
          profiles.img AS profile_photo
        FROM 
          profiles
        WHERE 
          profiles.username ILIKE ? OR profiles.full_name ILIKE ?
        ORDER BY 
          profiles.id DESC
        LIMIT 
          20
      `;
            const posts = await knex_1.knex.raw(postsQuery, [`%${query}%`]);
            const profiles = await knex_1.knex.raw(profilesQuery, [`%${query}%`, `%${query}%`]);
            // Combine results
            const results = { posts: posts.rows, profiles: profiles.rows };
            return results;
        }
        catch (error) {
            throw new Error(`Error fetching search results: ${error.message}`);
        }
    }
}
exports.default = SearchService;
