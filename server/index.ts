import path = require("path");
import express = require("express");
import { handleCookieSessions } from "./middleware/handleCookieSessions";
import { logRoutes } from "./middleware/logRoutes";
import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
import postRouter from './routers/postRouter';
import { profileRouter } from "./routers/profileRouter";
import multer = require('multer');
import User from "./db/models/User";

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
app.use(handleCookieSessions); // Adds a session property to each request representing the cookie
app.use(logRoutes); // Print information about each incoming request
app.use(express.json()); // Parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend

// Routers
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/profiles', profileRouter);

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.get('/api/upload', (req, res) => {
  res.send('This is the upload endpoint.');
});

app.post('/api/upload', userImg.single('userImg'), async (req, res) => {
  try {
    // Handle file upload
    const imagePath = path.join(req.file.path); // Assuming req.file.path is the correct file path

    // Create user with the image path
    const newUser = await User.createWithImage(req.body, imagePath);

    res.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

export default userImg;
