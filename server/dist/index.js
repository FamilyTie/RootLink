"use strict";
// require("dotenv").config()
// import path = require("path")
// import express = require("express")
// import { handleCookieSessions } from "./middleware/handleCookieSessions"
// import { logRoutes } from "./middleware/logRoutes"
// import authRouter from './routers/authRouter'
// import userRouter from './routers/userRouter';
// import postRouter from './routers/postRouter';
// import { profileRouter } from "./routers/profileRouter"
// import User from "./db/models/User"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// // // middleware
// app.use(handleCookieSessions); // adds a session property to each request representing the cookie
// app.use(logRoutes); // print information about each incoming request
// app.use(express.json()); // parse incoming request bodies as JSON
// app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend
// app.use('/api', authRouter);
// app.use('/api/users', userRouter);
// app.use('/api/posts', postRouter);
// app.use('/api/profiles', profileRouter);
// app.post('/api/signup', async (req, res) => {
//   try {
//     // Extract user data from request body
//     const { email, password }: { email: string, password: string } = req.body;
//     // Check if email already exists in the database
//     const existingUser = await User.findByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email is already in use' });
//     }
//     // Save user to database
//     await User.create({email, password});
//     // Respond with success message
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error signing up user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// // Requests meant for the API will be sent along to the router.
// // For all other requests, send back the index.html file in the dist folder.
// app.get("*", (req, res, next) => {
//   if (req.originalUrl.startsWith("/api")) return next()
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
// })
// const port = process.env.PORT || 3000
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`)
// })
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const handleCookieSessions_1 = require("./middleware/handleCookieSessions");
const logRoutes_1 = require("./middleware/logRoutes");
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const postRouter_1 = __importDefault(require("./routers/postRouter"));
const profileRouter_1 = require("./routers/profileRouter");
const User_1 = __importDefault(require("./db/models/User"));
const app = (0, express_1.default)();
// Middleware
app.use(handleCookieSessions_1.handleCookieSessions); // Adds a session property to each request representing the cookie
app.use(logRoutes_1.logRoutes); // Prints information about each incoming request
app.use(express_1.default.json()); // Parse incoming request bodies as JSON
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/dist"))); // Serve static assets from the dist folder of the frontend
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Routers
app.use("/api", authRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.use("/api/posts", postRouter_1.default);
app.use("/api/profiles", profileRouter_1.profileRouter);
// Signup Route
app.post("/api/signup", async (req, res) => {
    try {
        // Extract user data from request body
        const { email, password } = req.body;
        // Validate email and password (you can use a library like 'validator' or 'joi' for more robust validation)
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        // Check if email already exists in the database
        const existingUser = await User_1.default.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }
        // Save user to database
        await User_1.default.create({ email, password });
        // Respond with success message
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api"))
        return next();
    res.sendFile(path_1.default.join(__dirname, "../frontend/dist/index.html"));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
