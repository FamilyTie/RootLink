"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chatrooms = void 0;
const knex_1 = require("../knex");
class Chatrooms {
    constructor(data) {
        this.id = data.id;
        this.user1_id = data.user1_id;
        this.user2_id = data.user2_id;
        this.created_at = data.created_at || new Date();
        this.updated_at = data.updated_at || new Date();
    }
    static async createChatRoom(user1_id, user2_id) {
        try {
            const query = `
        INSERT INTO chatrooms (user1_id, user2_id)
        VALUES (?, ?)
        RETURNING *`;
            const { rows } = await knex_1.knex.raw(query, [user1_id, user2_id]);
            return new Chatrooms(rows[0]);
        }
        catch (error) {
            console.error("Error creating chat room:", error);
            throw error;
        }
    }
    static async findChatRoom(user1_id, user2_id) {
        try {
            const query = `
        SELECT * FROM chatrooms
        WHERE (user1_id = ? AND user2_id = ?)
        OR (user1_id = ? AND user2_id = ?)`;
            const { rows } = await knex_1.knex.raw(query, [
                user1_id,
                user2_id,
                user2_id,
                user1_id,
            ]);
            return rows.length ? new Chatrooms(rows[0]) : null;
        }
        catch (error) {
            console.error("Error finding chat room:", error);
            throw error;
        }
    }
    static async deleteChatroom(id) {
        try {
            const query = `
        DELETE FROM chatrooms
        WHERE id = ?
        RETURNING *`;
            const { rows } = await knex_1.knex.raw(query, [id]);
            return rows.length ? new Chatrooms(rows[0]) : null;
        }
        catch (error) {
            console.error("Error deleting chat room:", error);
            throw error;
        }
    }
    static async getMessages(chatroomId) {
        try {
            const query = `
        SELECT * FROM messages
        WHERE chatroom_id = ?`;
            const { rows } = await knex_1.knex.raw(query, [chatroomId]);
            return rows;
        }
        catch (error) {
            console.error("Error getting messages:", error);
            throw error;
        }
    }
    static async addMessage(id, userId, body) {
        try {
            console.log("chatroomId:", id);
            console.log("userId:", userId);
            console.log("body:", body);
            const query = `
        INSERT INTO messages (chatroom_id, user_sent, body)
        VALUES (?, ?, ?)
        RETURNING *`;
            const { rows } = await knex_1.knex.raw(query, [id, userId, body]);
            return rows.length ? rows[0] : null;
        }
        catch (error) {
            console.error("Error adding message:", error);
            throw error;
        }
    }
}
exports.Chatrooms = Chatrooms;
exports.default = Chatrooms;
