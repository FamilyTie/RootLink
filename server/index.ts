import * as path from "path"
import express, { Application, Request, Response } from "express"
import { handleCookieSessions } from "./middleware/handleCookieSessions"
import { logRoutes } from "./middleware/logRoutes"
import { likeRouter } from "./routers/LikeRouter"
import authRouter from "./routers/authRouter"
import userRouter from "./routers/userRouter"
import postRouter from "./routers/postRouter"
import { profileRouter } from "./routers/profileRouter"
import commentRouter from "./routers/commentRouter"
import User from "./db/models/User"
import cookieParser from "cookie-parser"
import ChatRoomRouter from "./routers/chatroomsRouter"
import { searchRouter } from "./routers/searchRouter"
import cors from "cors"
import Chatrooms from "./db/models/ChatRooms"
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fetchAutoCompleteLocations } from "./utils/api-fetches"
import { locationRouter } from "./routers/locationRouter"
import { connectionRouter } from "./routers/connectionRouter"
import { notificationRouter } from "./routers/notificationRouter"
const compression = require('compression');
const http = require("http")
const { Server } = require("socket.io")
const { ExpressPeerServer } = require("peer")
const { v4: uuidv4 } = require('uuid');
const app: Application = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["https://rootlink.onrender.com/", "http://localhost:5173"],
    methods: ["GET", "POST"],
  },
})



// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(compression());

app.use(cookieParser())
app.use(handleCookieSessions)
app.use(logRoutes)
app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend/dist")))



// Routers
app.use("/api", authRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/profiles", profileRouter)
app.use("/api/comments", commentRouter)
app.use("/api/chatrooms", ChatRoomRouter)
app.use("/api/likes", likeRouter)
app.use("/api/search", searchRouter)
app.use("/api/location", locationRouter)
app.use("/api/connection", connectionRouter)
app.use("/api/notifications", notificationRouter)
app.get('/api/autocomplete', fetchAutoCompleteLocations)

app.post('/create-room', (req, res) => {
  const roomId = uuidv4();
  const room = { id: roomId, participants: [] };
  // Store the meeting room in the database
  // ...
  res.json(room);
});



app.get(/^(?!\/api).*/, function (request: Request, response: Response) {
  response.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
})

io.on("connection", (socket) => {
  console.log("New client connected")

  socket.on("join", (userId) => {
    socket.userId = userId
    console.log(`User ${userId} connected with socket ID ${socket.id}`)
  })

  socket.on("offer", ({ userId, offer }) => {
    const recipientSocketId = User[userId]
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("offer", offer)
    }
  })

  socket.on("answer", ({ userId, answer }) => {
    const recipientSocketId = User[userId]
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("answer", answer)
    }
  })

  socket.on("candidate", ({ userId, candidate }) => {
    const recipientSocketId = User[userId]
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("candidate", candidate)
    }
  })

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId)
    console.log(`Client joined room ${roomId}`)
  })

  socket.on("message", async (message) => {
    const { chatroomId, userId, body } = message
    console.log("Received message:", { chatroomId, userId, body })

    if (!chatroomId || !userId || !body) {
      console.error("Invalid message format:", message)
      return
    }

    try {
      const savedMessage = await Chatrooms.addMessage(chatroomId, userId, body)
      io.to(chatroomId).emit("message", savedMessage)
    } catch (error) {
      console.error("Error adding message:", error)
    }
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

const port = process.env.PORT || 3761
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
// run command for peer in backend : npx peerjs --port 9000 --path /peerjs
// local chat fully works
// run 2 frontend 5173
// http://localhost:5173/video-chat/1/?myPeerId=peer2&targetPeerId=peer1
// http://localhost:5173/video-chat/1/?myPeerId=peer1&targetPeerId=peer2

// need to make it broadcase to
// chatroom instead of url and also give me a console log or
// something that requeste was succesfully sent
