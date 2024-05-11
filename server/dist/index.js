"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const handleCookieSessions_1 = require("./middleware/handleCookieSessions");
const logRoutes_1 = require("./middleware/logRoutes");
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const postRouter_1 = __importDefault(require("./routers/postRouter"));
const profileRouter_1 = require("./routers/profileRouter");
const multer = require("multer");
const User_1 = __importDefault(require("./db/models/User"));
const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'userImg/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const userProfileName = `userProfile${ext}`;
        cb(null, userProfileName);
    }
});
const userImg = multer({ storage: storage });
// Middleware
app.use(handleCookieSessions_1.handleCookieSessions); // Adds a session property to each request representing the cookie
app.use(logRoutes_1.logRoutes); // Print information about each incoming request
app.use(express.json()); // Parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend
// Routers
app.use('/api', authRouter_1.default);
app.use('/api/users', userRouter_1.default);
app.use('/api/posts', postRouter_1.default);
app.use('/api/profiles', profileRouter_1.profileRouter);
// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api"))
        return next();
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
// app.get('/api/upload', (req, res) => {
//   res.send('This is the upload endpoint.');
// });
app.post('/api/upload', userImg.single('userImg'), async (req, res) => {
    try {
        // Handle file upload
        const imagePath = req.file.path; // Assuming req.file.path is the correct file path
        // Create user with the image path
        const newUser = await User_1.default.createWithImage(req.body, imagePath);
        res.json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.error("Error uploading profile image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
exports.default = userImg;
