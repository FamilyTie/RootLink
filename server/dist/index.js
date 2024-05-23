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
const searchRouter_1 = require("./routers/searchRouter");
const cors_1 = __importDefault(require("cors"));
const ChatRooms_1 = __importDefault(require("./db/models/ChatRooms"));
const api_fetches_1 = require("./utils/api-fetches");
const locationRouter_1 = require("./routers/locationRouter");
const connectionRouter_1 = require("./routers/connectionRouter");
const notificationRouter_1 = require("./routers/notificationRouter");
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
app.use("/api/search", searchRouter_1.searchRouter);
app.use("/api/location", locationRouter_1.locationRouter);
app.use("/api/connection", connectionRouter_1.connectionRouter);
app.use("/api/notifications", notificationRouter_1.notificationRouter);
app.get('/api/autocomplete', api_fetches_1.fetchAutoCompleteLocations);
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
        const { chatroomId, userId, body } = message;
        console.log("Received message:", { chatroomId, userId, body });
        if (!chatroomId || !userId || !body) {
            console.error("Invalid message format:", message);
            return;
        }
        try {
            // Save the message to the database
            const savedMessage = await ChatRooms_1.default.addMessage(chatroomId, userId, body);
            // Emit the message to the specific room
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
const port = process.env.PORT || 3761;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
