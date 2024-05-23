"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSentNotifications = exports.deleteNotification = exports.updateNotification = exports.clearNotifications = exports.getNotifications = exports.createNotification = void 0;
const Notifications_1 = require("../db/models/Notifications");
const createNotification = async (req, res) => {
    try {
        const { profile_id_sent, profile_id_received, body } = req.body;
        const newNotification = await Notifications_1.Notification.create({ profile_id_sent, profile_id_received, body });
        res.status(201).json(newNotification);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create notification", error: error.toString() });
    }
};
exports.createNotification = createNotification;
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notifications_1.Notification.listByProfileId(Number(req.params.profileId));
        res.send(notifications);
    }
    catch (error) {
        console.error("Failed to fetch notifications:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch notifications", error: error.toString() });
    }
};
exports.getNotifications = getNotifications;
const clearNotifications = async (req, res) => {
    try {
        const profile_id = Number(req.params.profileId);
        const deleted = await Notifications_1.Notification.clearNotifications(profile_id);
        res.send(deleted);
    }
    catch (error) {
        console.error("Failed to clear notifications:", error);
        res
            .status(500)
            .json({ message: "Failed to clear notifications", error: error.toString() });
    }
};
exports.clearNotifications = clearNotifications;
const updateNotification = async (req, res) => {
    try {
        const id = Number(req.params.notificationId);
        const { profile_id_sent, profile_id_received, body } = req.body;
        const updated = await Notifications_1.Notification.updateNotification(id, { profile_id_sent, profile_id_received, body });
        res.send(updated);
    }
    catch (error) {
        console.error("Failed to update notification:", error);
        res
            .status(500)
            .json({ message: "Failed to update notification", error: error.toString() });
    }
};
exports.updateNotification = updateNotification;
const deleteNotification = async (req, res) => {
    try {
        const id = Number(req.params.notificationId);
        const deleted = await Notifications_1.Notification.deleteNotification(id);
        res.send(deleted);
    }
    catch (error) {
        console.error("Failed to delete notification:", error);
        res
            .status(500)
            .json({ message: "Failed to delete notification", error: error.toString() });
    }
};
exports.deleteNotification = deleteNotification;
const listSentNotifications = async (req, res) => {
    try {
        const notifications = await Notifications_1.Notification.listSentByProfileId(Number(req.params.profileId));
        res.send(notifications);
    }
    catch (error) {
        console.error("Failed to fetch sent notifications:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch sent notifications", error: error.toString() });
    }
};
exports.listSentNotifications = listSentNotifications;
