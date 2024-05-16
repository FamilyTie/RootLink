"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomRouter = void 0;
const express = require("express");
const chatroomController_1 = require("../controllers/chatroomController");
exports.ChatRoomRouter = express.Router();
exports.ChatRoomRouter.post("/", chatroomController_1.createChatroom);
exports.ChatRoomRouter.delete("/:id", chatroomController_1.deleteChatroom);
exports.ChatRoomRouter.get("/user/:userId", chatroomController_1.getChatroomsByUserId);
exports.ChatRoomRouter.get("/:id/messages", chatroomController_1.getMessages);
exports.ChatRoomRouter.post("/:id/messages", chatroomController_1.addMessage);
exports.default = exports.ChatRoomRouter;