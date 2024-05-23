import express from 'express'

import {
    createNotification,
    getNotifications,
    clearNotifications,
    updateNotification,
    deleteNotification,
    listSentNotifications,
} from "../controllers/notificationController"



export const notificationRouter = express.Router()



notificationRouter.post("/", createNotification)
notificationRouter.get("/:profileId", getNotifications)
notificationRouter.get("/sent/:profileId", listSentNotifications)
notificationRouter.put("/:notificationId", updateNotification)
notificationRouter.delete("/:notificationId", deleteNotification)
