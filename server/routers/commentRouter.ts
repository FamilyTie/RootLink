const express = require("express")
import {
  createComment,
  getCommentsByPost,
  updateComment,
} from "../controllers/commentController"

export const commentRouter = express.Router()

commentRouter.post("/", createComment)

commentRouter.get("/", getCommentsByPost)

commentRouter.patch("/:id", updateComment)

export default commentRouter
