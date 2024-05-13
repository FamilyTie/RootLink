import path = require("path");
import express = require("express");
import { handleCookieSessions } from "./middleware/handleCookieSessions";
import { logRoutes } from "./middleware/logRoutes";
import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
import postRouter from './routers/postRouter';
import { profileRouter } from "./routers/profileRouter"
import User from "./db/models/User"

const app = express();

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


const port = process.env.PORT || 3761;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});