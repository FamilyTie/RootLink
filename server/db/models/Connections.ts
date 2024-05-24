import { knex } from '../knex'
import { Notification } from './Notifications'
export interface ConnectionData {
    id: number
    profile_id1: number
    profile_id2: number
    created_at?: Date
}



export class Connection {
    id?: number
    profile_id1: number
    profile_id2: number
    createdAt: Date


    constructor(data: ConnectionData) {
        this.id = data.id
        this.profile_id1 = data.profile_id1
        this.profile_id2 = data.profile_id2
        this.createdAt = data.created_at || new Date()
    }

    static async create(data: Omit<ConnectionData, "id">) {
        try {
            const query = `INSERT INTO connections (profile_id1, profile_id2, created_at)
                      VALUES (?, ?, ?) RETURNING *`
            const values = [
                data.profile_id1,
                data.profile_id2,
                new Date()
            ]
            const { rows } = await knex.raw(query, values)
            return new Connection(rows[0])
        } catch (error) {
            console.error('Failed to create connection:', error)
            return null
        }
    }

    static async listByProfileId(profile_id: number) {
        const query = `
          SELECT 
            connections.*, 
            COALESCE(profile1.img, profile2.img) AS profile_img,
            COALESCE(profile1.username, profile2.username) AS profile_username
          FROM 
            connections
          LEFT JOIN 
            profiles AS profile1 ON connections.profile_id1 = profile1.id AND connections.profile_id1 <> ?
          LEFT JOIN 
            profiles AS profile2 ON connections.profile_id2 = profile2.id AND connections.profile_id2 <> ?
          WHERE 
            connections.profile_id1 = ? OR connections.profile_id2 = ?
        `;
        const { rows } = await knex.raw(query, [profile_id, profile_id, profile_id, profile_id]);
        return rows.map((connection: any) => ({
          ...new Connection(connection),
          profile_img: connection.profile_img,
          profile_username: connection.profile_username,
        }));
      }


    static async requestConnection(profile_id1: number, profile_id2: number) {

        try {
            const data = {
                profile_id_sent: profile_id1,
                profile_id_received: profile_id2,
                body: 'connection'
            }
            const notification = await Notification.create(data)
            if (!notification) {
                throw new Error('Failed to create notification')
            }
        } catch (error) {
            console.error('Failed to request connection:', error)
            return null
        }
    }

    static async removeConnection(profile_id1: number, profile_id2: number) {
        try {
            const query = `DELETE FROM connections WHERE profile_id1 = ? AND profile_id2 = ?`
            const values = [profile_id1, profile_id2]
            await knex.raw(query, values)
        } catch (error) {
            console.error('Failed to remove connection:', error)
        }
    }
}


