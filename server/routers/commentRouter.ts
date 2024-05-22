const express = require("express")
import {
  createComment,
  getCommentsByPost,
  updateComment,
  getAllComments,
  deleteCommentById,
} from "../controllers/commentController"

export const commentRouter = express.Router()

commentRouter.post("/", createComment)

commentRouter.get("/", getAllComments)
commentRouter.get("/posts", getCommentsByPost)

commentRouter.post("/", createComment)

commentRouter.patch("/:id", updateComment)

commentRouter.delete("/:id", deleteCommentById)

export default commentRouter
