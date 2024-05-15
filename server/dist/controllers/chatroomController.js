"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = exports.getMessages = exports.deleteChatroom = exports.createChatroom = void 0;
const ChatRooms_1 = require("../db/models/ChatRooms");
const createChatroom = async (req, res) => {
    const { user1_id, user2_id } = req.body;
    try {
        const existingChatroom = await ChatRooms_1.Chatrooms.findChatRoom(user1_id, user2_id);
        if (existingChatroom) {
            return res.status(200).json(existingChatroom);
        }
        const newChatroom = await ChatRooms_1.Chatrooms.createChatRoom(user1_id, user2_id);
        res.status(201).json(newChatroom);
    }
    catch (error) {
        console.error("Failed to create chatroom:", error);
        res
            .status(500)
            .json({ message: "Failed to create chatroom", error: error.toString() });
    }
};
exports.createChatroom = createChatroom;
const deleteChatroom = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedChatroom = await ChatRooms_1.Chatrooms.deleteChatroom(Number(id));
        if (deletedChatroom) {
            res
                .status(200)
                .json({ message: "Chatroom deleted", chatroom: deletedChatroom });
        }
        else {
            res.status(404).json({ message: "Chatroom not found" });
        }
    }
    catch (error) {
        console.error("Failed to delete chatroom:", error);
        res
            .status(500)
            .json({ message: "Failed to delete chatroom", error: error.toString() });
    }
};
exports.deleteChatroom = deleteChatroom;
const getMessages = async (req, res) => {
    const { id } = req.params;
    try {
        const messages = await ChatRooms_1.Chatrooms.getMessages(Number(id));
        res.status(200).json(messages);
    }
    catch (error) {
        console.error("Failed to fetch messages:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch messages", error: error.toString() });
    }
};
exports.getMessages = getMessages;
const addMessage = async (req, res) => {
    const { id } = req.params; // Extract id from URL parameters
    const { userId, body } = req.body;
    console.log("controller id:", id); // Log to verify id is extracted correctly
    console.log("controller userId:", userId);
    console.log("controller body:", body);
    if (!id) {
        console.log("Invalid chatroom ID:", id);
        return res.status(400).json({ message: "Invalid chatroom ID" });
    }
    try {
        const message = await ChatRooms_1.Chatrooms.addMessage(Number(id), userId, body);
        res.status(201).json(message);
    }
    catch (error) {
        console.error("Failed to add message:", error);
        res
            .status(500)
            .json({ message: "Failed to add message", error: error.toString() });
    }
};
exports.addMessage = addMessage;
