const express = require("express")
import {
  createChatroom,
  deleteChatroom,
  getMessages,
  addMessage,
} from "../controllers/chatroomController"

export const ChatRoomRouter = express.Router()

ChatRoomRouter.post("/", createChatroom)
ChatRoomRouter.delete("/:id", deleteChatroom)
ChatRoomRouter.get("/:id/messages", getMessages)
ChatRoomRouter.post("/:id/messages", addMessage)

export default ChatRoomRouter
