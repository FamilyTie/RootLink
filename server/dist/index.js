"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const handleCookieSessions_1 = require("./middleware/handleCookieSessions");
const logRoutes_1 = require("./middleware/logRoutes");
const LikeRouter_1 = require("./routers/LikeRouter");
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const postRouter_1 = __importDefault(require("./routers/postRouter"));
const profileRouter_1 = require("./routers/profileRouter");
const commentRouter_1 = __importDefault(require("./routers/commentRouter"));
const User_1 = __importDefault(require("./db/models/User"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const chatroomsRouter_1 = __importDefault(require("./routers/chatroomsRouter"));
const searchRouter_1 = require("./routers/searchRouter");
const cors_1 = __importDefault(require("cors"));
const ChatRooms_1 = __importDefault(require("./db/models/ChatRooms"));
const api_fetches_1 = require("./utils/api-fetches");
const locationRouter_1 = require("./routers/locationRouter");
const connectionRouter_1 = require("./routers/connectionRouter");
const notificationRouter_1 = require("./routers/notificationRouter");
const http = require("http");
const { Server } = require("socket.io");
const { ExpressPeerServer } = require("peer");
const { v4: uuidv4 } = require('uuid');
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://rootlink.onrender.com/", "http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(handleCookieSessions_1.handleCookieSessions);
app.use(logRoutes_1.logRoutes);
app.use(express_1.default.json());
app.use(express_1.default.static(path.join(__dirname, "../frontend/dist")));
// Routers
app.use("/api", authRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.use("/api/posts", postRouter_1.default);
app.use("/api/profiles", profileRouter_1.profileRouter);
app.use("/api/comments", commentRouter_1.default);
app.use("/api/chatrooms", chatroomsRouter_1.default);
app.use("/api/likes", LikeRouter_1.likeRouter);
app.use("/api/search", searchRouter_1.searchRouter);
app.use("/api/location", locationRouter_1.locationRouter);
app.use("/api/connection", connectionRouter_1.connectionRouter);
app.use("/api/notifications", notificationRouter_1.notificationRouter);
app.get('/api/autocomplete', api_fetches_1.fetchAutoCompleteLocations);
app.post('/create-room', (req, res) => {
    const roomId = uuidv4();
    const room = { id: roomId, participants: [] };
    // Store the meeting room in the database
    // ...
    res.json(room);
});
app.get(/^(?!\/api).*/, function (request, response) {
    response.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});
io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("join", (userId) => {
        socket.userId = userId;
        console.log(`User ${userId} connected with socket ID ${socket.id}`);
    });
    socket.on("offer", ({ userId, offer }) => {
        const recipientSocketId = User_1.default[userId];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("offer", offer);
        }
    });
    socket.on("answer", ({ userId, answer }) => {
        const recipientSocketId = User_1.default[userId];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("answer", answer);
        }
    });
    socket.on("candidate", ({ userId, candidate }) => {
        const recipientSocketId = User_1.default[userId];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("candidate", candidate);
        }
    });
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`Client joined room ${roomId}`);
    });
    socket.on("message", async (message) => {
        const { chatroomId, userId, body } = message;
        console.log("Received message:", { chatroomId, userId, body });
        if (!chatroomId || !userId || !body) {
            console.error("Invalid message format:", message);
            return;
        }
        try {
            const savedMessage = await ChatRooms_1.default.addMessage(chatroomId, userId, body);
            io.to(chatroomId).emit("message", savedMessage);
        }
        catch (error) {
            console.error("Error adding message:", error);
        }
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
const port = process.env.PORT || 3761;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// run command for peer in backend : npx peerjs --port 9000 --path /peerjs
// local chat fully works
// run 2 frontend 5173
// http://localhost:5173/video-chat/1/?myPeerId=peer2&targetPeerId=peer1
// http://localhost:5173/video-chat/1/?myPeerId=peer1&targetPeerId=peer2
// need to make it broadcase to
// chatroom instead of url and also give me a console log or
// something that requeste was succesfully sent
