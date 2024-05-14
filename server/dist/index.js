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
<<<<<<< HEAD
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
=======
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
>>>>>>> 56532abd33698a02e646822f3d68533dfc070ffa
const handleCookieSessions_1 = require("./middleware/handleCookieSessions");
const logRoutes_1 = require("./middleware/logRoutes");
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const postRouter_1 = __importDefault(require("./routers/postRouter"));
const profileRouter_1 = require("./routers/profileRouter");
<<<<<<< HEAD
const commentRouter_1 = require("./routers/commentRouter");
const app = express();
// // middleware
app.use(cors());
app.use(handleCookieSessions_1.handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes_1.logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve static assets from the dist folder of the frontend
app.use("/api", authRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.use("/api/posts", postRouter_1.default);
app.use("/api/profiles", profileRouter_1.profileRouter);
app.use("/api/comments", commentRouter_1.default);
// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api"))
        return next();
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
=======
const app = (0, express_1.default)();
// Middleware
app.use(handleCookieSessions_1.handleCookieSessions); // Adds a session property to each request representing the cookie
app.use(logRoutes_1.logRoutes); // Print information about each incoming request
app.use(express_1.default.json()); // Parse incoming request bodies as JSON
app.use(express_1.default.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend
// Routers
app.use('/api', authRouter_1.default);
app.use('/api/users', userRouter_1.default);
app.use('/api/posts', postRouter_1.default);
app.use('/api/profiles', profileRouter_1.profileRouter);
app.get(/^(?!\/api).*/, function (request, response) {
    response.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
>>>>>>> 56532abd33698a02e646822f3d68533dfc070ffa
});
const port = process.env.PORT || 3761;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
