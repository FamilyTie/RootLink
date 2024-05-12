"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const path = require("path");
const express = require("express");
const handleCookieSessions_1 = require("./middleware/handleCookieSessions");
const logRoutes_1 = require("./middleware/logRoutes");
const authRouter_1 = require("./routers/authRouter");
const userRouter_1 = require("./routers/userRouter");
const postRouter_1 = require("./routers/postRouter");
const profileRouter_1 = require("./routers/profileRouter");
const commentRouter_1 = require("./routers/commentRouter");
const app = express();
// // middleware
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
});
const port = process.env.PORT || 1090;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
