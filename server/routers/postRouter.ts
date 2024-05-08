const express = require('express')
import { getRecentPost, getRecentPostByProfile  } from "../controllers/postController"

export const postRouter = express.Router()


postRouter.get('/', getRecentPost)
postRouter.get('/:profileId', getRecentPostByProfile)

export default postRouter