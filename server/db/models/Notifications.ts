import { knex } from '../knex'

export interface NotificationData {
    id?: number
    profile_id_sent: number
    profile_id_received: number
    body: string
    created_at?: Date
    updated_at?: Date
    read?: boolean
}


export class Notification {
    id?: number
    profile_id_sent: number
    profile_id_received: number
    body: string
    createdAt: Date
    updatedAt: Date
    read?: boolean

    constructor(data: NotificationData) {
        this.id = data.id
        this.profile_id_sent = data.profile_id_sent
        this.profile_id_received = data.profile_id_received
        this.body = data.body
        this.createdAt = data.created_at || new Date()
        this.updatedAt = data.updated_at || new Date()
        this.read = data.read || false
    }


    static async create(data: Omit<NotificationData, "id">) {
        try {
            const query = `INSERT INTO notifications (profile_id_sent, profile_id_received, body, created_at, updated_at)
                      VALUES (?, ?, ?, ?, ?) RETURNING *`
            const values = [
                data.profile_id_sent,
                data.profile_id_received,
                data.body,
                new Date(),
                new Date()
            ]
            const { rows } = await knex.raw(query, values)
            return new Notification(rows[0])
        } catch (error) {
            console.error('Failed to create notification:', error)
            return null
        }
    }


    static async listByProfileId(profile_id: number) {
        const query = `
            SELECT 
                notifications.*,
                profiles.img AS profile_img, 
                profiles.username AS profile_username
            FROM 
                notifications
            JOIN 
                profiles ON notifications.profile_id_sent = profiles.id
            WHERE 
                notifications.profile_id_received = ?
        `;
        const { rows } = await knex.raw(query, [profile_id]);
        return rows.map((notification: any) => ({
            ...new Notification(notification),
            profile_img: notification.profile_img,
            profile_username: notification.profile_username,
        }));
    }


    static async listSentByProfileId(profile_id: number) {
        const query = `
          SELECT 
            notifications.*,
            profiles.img AS profile_img, 
            profiles.username AS profile_username
          FROM 
            notifications
          JOIN 
            profiles ON notifications.profile_id_received = profiles.id
          WHERE 
            notifications.profile_id_sent = ?
        `;
        const { rows } = await knex.raw(query, [profile_id]);
        return rows.map((notification: any) => ({
          ...new Notification(notification),
          profile_img: notification.profile_img,
          profile_username: notification.profile_username,
        }));
      }
      
    static async clearNotifications(profile_id: number) {
        const query = `DELETE FROM notifications WHERE profile_id_received = ?`
        await knex.raw(query, [profile_id])
    }

    static async updateNotification(id: number, data: Partial<NotificationData>) {
        await knex('notifications')
            .where({ id })
            .update(data);
    }

    static async deleteNotification(id: number) {
        try {
          console.log(`Attempting to delete notification with id ${id}`);
          const query = 'DELETE FROM notifications WHERE id = ?';
          const result = await knex.raw(query, [id]);
          console.log('Deletion result:', result);
          console.log(`Notification with id ${id} deleted successfully.`);
        } catch (error) {
          console.error('Error deleting notification:', error);
          throw error;
        }
      }
}


