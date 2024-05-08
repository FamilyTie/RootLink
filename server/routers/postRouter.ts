const express = require('express')
import { getRecentPost } from "../controllers/postController"

export const postRouter = express.Router()


postRouter.get('/posts', getRecentPost)

export default postRouter