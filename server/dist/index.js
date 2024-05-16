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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const chatroomsRouter_1 = __importDefault(require("./routers/chatroomsRouter"));
const cors_1 = __importDefault(require("cors"));
const ChatRooms_1 = __importDefault(require("./db/models/ChatRooms"));
const http = require("http");
const socketIo = require("socket.io");
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
// Middleware
// Serve static assets from the dist folder of the frontend
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
app.get(/^(?!\/api).*/, function (request, response) {
    response.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});
io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`Client joined room ${roomId}`);
    });
    socket.on("message", async (message) => {
        // Save the message to the database
        await ChatRooms_1.default.addMessage(message.chatroomId, message.userId, message.body);
        // Emit the message to the specific room
        io.to(message.chatroomId).emit("message", message);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
const port = process.env.PORT || 3761;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
