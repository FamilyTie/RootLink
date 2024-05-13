require("dotenv").config()
import path = require("path")
import express = require("express")
import cors = require("cors")
import { handleCookieSessions } from "./middleware/handleCookieSessions"
import { logRoutes } from "./middleware/logRoutes"
import authRouter from "./routers/authRouter"
import userRouter from "./routers/userRouter"
import postRouter from "./routers/postRouter"
import { profileRouter } from "./routers/profileRouter"
import commentRouter from "./routers/commentRouter"
const app = express()

// // middleware
app.use(cors())
app.use(handleCookieSessions) // adds a session property to each request representing the cookie
app.use(logRoutes) // print information about each incoming request
app.use(express.json()) // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, "../frontend/dist"))) // Serve static assets from the dist folder of the frontend

app.use("/api", authRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/profiles", profileRouter)
app.use("/api/comments", commentRouter)

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next()
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})

const port = process.env.PORT || 1090
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
