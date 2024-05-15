import { Request, Response } from "express"
import { knex } from "../db/knex"
import Post from "../db/models/Post"

export const createPost = async (req: Request, res: Response) => {
  try {
    const { user_id, title, body, profile_id } = req.body
    const newPost = await Post.create({ user_id, title, body, profile_id })
    res.status(201).json(newPost)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.toString() })
  }
}

export const getRecentPost = async (req: Request, res: Response) => {
  const { lastId } = req.query
  let numericLastId = Number(lastId)

  // Check if lastId is NaN or undefined and handle it
  if (isNaN(numericLastId)) {
    numericLastId = 0 // or set it to a logic that fetches the most recent posts
  }

  try {
    const posts = await Post.list(numericLastId)
    res.send(posts)
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: error.toString() })
  }
}

export const getRecentPostByProfile = async (req: Request, res: Response) => {
  const lastId = req.query.lastId
  const profileId = req.params.profileId
  const posts = await Post.listByProfile(Number(lastId), Number(profileId))
  res.send(posts)
}
