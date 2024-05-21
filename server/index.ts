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

// import sendDataToPythonServer from "./db/sendData/dataSender"
const http = require("http")
const socketIo = require("socket.io")
import sendDataToPythonServer from "./db/sendData/dataSender";


const app: Application = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

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

app.get(/^(?!\/api).*/, function (request: Request, response: Response) {
  response.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
})
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", (userId) => {
    socket.userId = userId;
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
  });

  socket.on("offer", ({ userId, offer }) => {
    const recipientSocketId = User[userId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("offer", offer);
    }
  });

  socket.on("answer", ({ userId, answer }) => {
    const recipientSocketId = User[userId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("answer", answer);
    }
  });

  socket.on("candidate", ({ userId, candidate }) => {
    const recipientSocketId = User[userId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("candidate", candidate);
    }
  });

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
      // Save the message to the database
      const savedMessage = await Chatrooms.addMessage(chatroomId, userId, body)
      // Emit the message to the specific room
      io.to(chatroomId).emit("message", savedMessage)
    } catch (error) {
      console.error("Error adding message:", error)
    }
  })

  socket.on("disconnect", () => {
    console.log(`User ${socket.userId} disconnected`);
    delete User[socket.userId];
  });
});

// function sendDataToPythonServer() {

//   .then(() => {
//     console.log('Data sent to Python server successfully');

//     // Start the Express server
//     app.listen(3000, () => {
//       console.log('Express server listening on port 3000');
//     });
//   })
//   .catch((error) => {
//     console.error('Error sending data to Python server:', error);

//     // If there was an error sending data, you might choose to start the server anyway
//     app.listen(5000, () => {
//       console.log('Express server listening on port 3000');
//     });
//   });

const port = process.env.PORT || 3761
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

