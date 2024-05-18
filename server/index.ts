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
import cookieParser from 'cookie-parser';
import ChatRoomRouter from "./routers/chatroomsRouter"
import { searchRouter } from "./routers/searchRouter"
import cors from "cors"
import Chatrooms from "./db/models/ChatRooms"

const http = require("http")
const socketIo = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

// Middleware
// Serve static assets from the dist folder of the frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(cookieParser());
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


app.get(/^(?!\/api).*/, function (request: Request, response: Response) {
  response.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
})

io.on("connection", (socket) => {
  console.log("New client connected")

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId)
    console.log(`Client joined room ${roomId}`)
  })

  socket.on("message", async (message) => {
    // Save the message to the database
    await Chatrooms.addMessage(message.chatroomId, message.userId, message.body)
    // Emit the message to the specific room
    io.to(message.chatroomId).emit("message", message)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

const port = process.env.PORT || 3761
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
