"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchInBatches = void 0;
const MLModel_1 = require("../../micro-services/MLModel");
const knex_1 = require("../knex");
console.log("hello");
class Profile {
    constructor(data) {
        this.id = data.id;
        this.img = data.img;
        this.userId = data.user_id;
        this.username = data.username;
        this.fullName = data.full_name;
        this.bio = data.bio;
        this.accountType = data.account_type;
        this.data = data.data;
        this.createdAt = data.created_at || new Date();
        this.updatedAt = data.updated_at || new Date();
        this.settings = data.settings;
    }
    static async list() {
        const query = `SELECT * FROM profiles`;
        const { rows } = await knex_1.knex.raw(query);
        return rows.map((profile) => new Profile(profile));
    }
    static async getSimilarProfiles(profile) {
        try {
            const similarProfiles = await (0, MLModel_1.processProfileAndFindMatches)(profile);
            console.log('similarProfiles:', similarProfiles);
            return similarProfiles;
        }
        catch (error) {
            console.error('Error getting similar profiles:', error);
        }
    }
    static async findById(id) {
        const query = `SELECT * FROM profiles WHERE id = ?`;
        const { rows } = await knex_1.knex.raw(query, [id]);
        const profile = rows[0];
        return profile ? new Profile(profile) : null;
    }
    static async findByUserId(userId) {
        const query = `SELECT * FROM profiles WHERE user_id = ?`;
        const { rows } = await knex_1.knex.raw(query, [userId]);
        const profile = rows[0];
        return profile ? new Profile(profile) : null;
    }
    static async create(data) {
        const query = `INSERT INTO profiles (img, user_id, username, full_name, bio, settings, account_type, data, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`;
        const values = [
            data.img || "",
            data.user_id,
            data.username,
            data.full_name,
            data.bio,
            data.settings || {},
            data.account_type,
            data.data || {},
            new Date(),
            new Date(),
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        let profile = rows[0];
        const similarProfiles = await Profile.getSimilarProfiles({ id: profile.id, adoption_year: profile.data.raw.adoptionYear, ethnicity: profile.data.raw.ethnicity, bio: profile.bio });
        if (similarProfiles)
            profile = { ...profile, similarProfiles };
        return profile ? new Profile(profile) : null;
    }
    static async update(id, data) {
        const updateFields = { ...data, updated_at: new Date() };
        const keys = Object.keys(updateFields).filter((key) => updateFields[key] !== undefined);
        const query = `UPDATE profiles SET ${keys
            .map((key) => `${key} = ?`)
            .join(", ")} WHERE id = ? RETURNING *`;
        const values = [...keys.map((key) => updateFields[key]), id];
        console.log("Update Query:", query);
        console.log("Update Values:", values);
        const { rows } = await knex_1.knex.raw(query, values);
        const profile = rows[0];
        return profile ? new Profile(profile) : null;
    }
    static async delete(id) {
        try {
            const query = `DELETE FROM profiles WHERE id = ?`;
            const result = await knex_1.knex.raw(query, [id]);
            if (result.rowCount === 0) {
                return null;
            }
            return true;
        }
        catch (error) {
            console.error("Failed to delete profile:", error);
            throw error;
        }
    }
    static async getProfileDataByUserId(userId) {
        const profileQuery = `
      SELECT p.bio, p.full_name, p.username, p.created_at, p.img
      FROM profiles p
      WHERE p.id = ?
    `;
        const postsQuery = `
      SELECT po.*
      FROM posts po
      WHERE po.profile_id = ?
    `;
        const profileResult = await knex_1.knex.raw(profileQuery, [userId]);
        const postsResult = await knex_1.knex.raw(postsQuery, [userId]);
        const profileData = profileResult.rows[0]; // Assuming userId is unique and will return a single row
        const postsData = postsResult.rows;
        return { ...profileData, posts: postsData };
    }
}
async function fetchInBatches(batchSize) {
    const batches = [];
    let offset = 0;
    while (true) {
        const profiles = await knex_1.knex.raw(`SELECT id, data FROM profiles ORDER BY id LIMIT ? OFFSET ?`, [batchSize, offset]);
        const profileData = profiles.rows;
        if (profileData.length === 0) {
            break;
        }
        batches.push(profileData);
        offset += batchSize;
    }
    return batches;
}
exports.fetchInBatches = fetchInBatches;
exports.default = Profile;
