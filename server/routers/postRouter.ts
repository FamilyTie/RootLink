const express = require("express")
import {
  getRecentPost,
  getRecentPostByProfile,
  createPost,
} from "../controllers/postController"

export const postRouter = express.Router()

postRouter.get("/", getRecentPost)
postRouter.get("/:profileId", getRecentPostByProfile)
postRouter.post("/", createPost)
export default postRouter
