import {Request, Response} from 'express';
import { Notification } from '../db/models/Notifications';


export const createNotification = async (req: Request, res: Response) => {
    try {
        const { profile_id_sent, profile_id_received, body } = req.body
        const newNotification = await Notification.create({profile_id_sent, profile_id_received, body})
        res.status(201).json(newNotification)
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create notification", error: error.toString() })
    }
}

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.listByProfileId(Number(req.params.profileId))
        res.send(notifications)
    } catch (error) {
        console.error("Failed to fetch notifications:", error)
        res
            .status(500)
            .json({ message: "Failed to fetch notifications", error: error.toString() })
    }
}

export const clearNotifications = async (req: Request, res: Response) => {
    try {
        const profile_id = Number(req.params.profileId)
        const deleted = await Notification.clearNotifications(profile_id)
        res.send(deleted)
    } catch (error) {
        console.error("Failed to clear notifications:", error)
        res
            .status(500)
            .json({ message: "Failed to clear notifications", error: error.toString() })
    }
}


export const updateNotification = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.notificationId)
        const { profile_id_sent, profile_id_received, body } = req.body
        const updated = await Notification.updateNotification(id, { profile_id_sent, profile_id_received, body })
        res.send(updated)
    } catch (error) {
        console.error("Failed to update notification:", error)
        res
            .status(500)
            .json({ message: "Failed to update notification", error: error.toString() })
    }
}

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.notificationId)
        const deleted = await Notification.deleteNotification(id)
        res.send(deleted)
    } catch (error) {
        console.error("Failed to delete notification:", error)
        res
            .status(500)
            .json({ message: "Failed to delete notification", error: error.toString() })
    }
}

export const listSentNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.listSentByProfileId(Number(req.params.profileId))
        res.send(notifications)
    } catch (error) {
        console.error("Failed to fetch sent notifications:", error)
        res
            .status(500)
            .json({ message: "Failed to fetch sent notifications", error: error.toString() })
    }
}