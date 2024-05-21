const express = require("express")
import {
  createChatroom,
  deleteChatroom,
  getChatroomsByUserId,
  getMessages,
  addMessage,
} from "../controllers/chatroomController"

export const ChatRoomRouter = express.Router()

ChatRoomRouter.post("/", createChatroom)
ChatRoomRouter.delete("/:id", deleteChatroom)
ChatRoomRouter.get("/user/:userId", getChatroomsByUserId)
ChatRoomRouter.get("/:id/messages", getMessages)
ChatRoomRouter.post("/:id/messages", addMessage)

export default ChatRoomRouter
