import { knex } from "../knex"

interface ChatRoomsData {
  id?: number
  user1_id: number
  user2_id: number
  created_at?: Date
  updated_at?: Date
}

export class Chatrooms {
  id?: number
  user1_id: number
  user2_id: number
  created_at?: Date
  updated_at?: Date

  constructor(data: ChatRoomsData) {
    this.id = data.id
    this.user1_id = data.user1_id
    this.user2_id = data.user2_id
    this.created_at = data.created_at || new Date()
    this.updated_at = data.updated_at || new Date()
  }

  static async createChatRoom(user1_id: number, user2_id: number) {
    try {
      const query = `
        INSERT INTO chatrooms (user1_id, user2_id)
        VALUES (?, ?)
        RETURNING *`
      const { rows } = await knex.raw(query, [user1_id, user2_id])
      const chatroom = new Chatrooms(rows[0])

      // Get user details
      const userDetailsQuery = `
        SELECT id, username, full_name, img 
        FROM profiles
        WHERE id = ? OR id = ?`
      const { rows: userDetails } = await knex.raw(userDetailsQuery, [
        user1_id,
        user2_id,
      ])

      return {
        chatroom,
        users: userDetails,
      }
    } catch (error) {
      console.error("Error creating chat room:", error)
      throw error
    }
  }

  static async findChatRoom(user1_id: number, user2_id: number) {
    try {
      const query = `
        SELECT * FROM chatrooms
        WHERE (user1_id = ? AND user2_id = ?)
        OR (user1_id = ? AND user2_id = ?)`
      const { rows } = await knex.raw(query, [
        user1_id,
        user2_id,
        user2_id,
        user1_id,
      ])
      const chatroom = rows.length ? new Chatrooms(rows[0]) : null

      if (!chatroom) return null

      // Get user details
      const userDetailsQuery = `
        SELECT id, username, full_name, img 
        FROM profiles
        WHERE id = ? OR id = ?`
      const { rows: userDetails } = await knex.raw(userDetailsQuery, [
        user1_id,
        user2_id,
      ])

      return {
        chatroom,
        users: userDetails,
      }
    } catch (error) {
      console.error("Error finding chat room:", error)
      throw error
    }
  }

  static async findChatRoomsByUserId(user_id: number) {
    try {
      const query = `
        SELECT * FROM chatrooms
        WHERE user1_id = ? OR user2_id = ?`
      const { rows } = await knex.raw(query, [user_id, user_id])
      const chatrooms = rows.map((row: ChatRoomsData) => new Chatrooms(row))

      // Get unique user IDs from chatrooms
      const userIds = [
        ...new Set(rows.flatMap((row) => [row.user1_id, row.user2_id])),
      ]

      // Get user details
      const userDetailsQuery = `
        SELECT id, username, full_name, img 
        FROM profiles
        WHERE id = ANY(?)`
      const { rows: userDetails } = await knex.raw(userDetailsQuery, [userIds])

      return {
        chatrooms,
        users: userDetails,
      }
    } catch (error) {
      console.error("Error finding chat rooms by user ID:", error)
      throw error
    }
  }

  static async deleteChatroom(id: number) {
    try {
      const query = `
        DELETE FROM chatrooms
        WHERE id = ?
        RETURNING *`
      const { rows } = await knex.raw(query, [id])
      return rows.length ? new Chatrooms(rows[0]) : null
    } catch (error) {
      console.error("Error deleting chat room:", error)
      throw error
    }
  }

  static async getMessages(chatroomId: number) {
    try {
      const query = `
        SELECT messages.*, profiles.username, profiles.full_name, profiles.img
        FROM messages
        JOIN profiles ON messages.user_sent = profiles.id
        WHERE messages.chatroom_id = ?
        ORDER BY messages.id DESC`
      const { rows } = await knex.raw(query, [chatroomId])
      return rows
    } catch (error) {
      console.error("Error getting messages:", error)
      throw error
    }
  }

  static async addMessage(id: number, userId: number, body: string) {
    try {
      if (id === undefined || userId === undefined || body === undefined) {
        console.error("Invalid parameters received in addMessage:", {
          id,
          userId,
          body,
        })
        throw new Error("Invalid parameters: id, userId, and body are required")
      }

      console.log("chatroomId:", id)
      console.log("userId:", userId)
      console.log("body:", body)

      const query = `
        INSERT INTO messages (chatroom_id, user_sent, body)
        VALUES (?, ?, ?)
        RETURNING *`
      const { rows } = await knex.raw(query, [id, userId, body])
      const message = rows.length ? rows[0] : null

      if (!message) {
        throw new Error("Failed to add message")
      }

      // Get sender details
      const userDetailsQuery = `
        SELECT id, username, full_name, img 
        FROM profiles
        WHERE id = ?`
      const { rows: userDetails } = await knex.raw(userDetailsQuery, [userId])

      const fullMessage = {
        ...message,
        username: userDetails[0].username,
        full_name: userDetails[0].full_name,
        img: userDetails[0].img,
      }

      return fullMessage
    } catch (error) {
      console.error("Error adding message:", error)
      throw error
    }
  }
}

export default Chatrooms
