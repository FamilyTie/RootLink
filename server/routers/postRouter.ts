const express = require("express")
import {
  getRecentPost,
  getRecentPostByProfile,
  createPost,
  getLikedPosts,
} from "../controllers/postController"

export const postRouter = express.Router()

postRouter.get("/", getRecentPost)
postRouter.get("/:profileId", getRecentPostByProfile)
postRouter.post("/", createPost)
postRouter.get("/liked/:profileId", getLikedPosts)
export default postRouter
