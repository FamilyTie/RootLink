const express = require("express")
import {
    createPostLike,
    createCommentLike,
    deletePostLike,
    deleteCommentLike,
    getPostLikes,
    getCommentLikes

} from "../controllers/likesController"

export const likeRouter = express.Router()


likeRouter.get("/post", getPostLikes) 
likeRouter.get("/comment", getCommentLikes)
likeRouter.route
likeRouter.post("/post", createPostLike)
likeRouter.post("/comment", createCommentLike)
likeRouter.delete("/post", deletePostLike)
likeRouter.delete("/comment", deleteCommentLike)