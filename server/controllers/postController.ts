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
  const lastId = req.query.lastId
  const posts = await Post.list(Number(lastId))
  res.send(posts)
}

export const getRecentPostByProfile = async (req: Request, res: Response) => {
  const lastId = req.query.lastId
  const profileId = req.params.profileId
  const posts = await Post.listByProfile(Number(lastId), Number(profileId))
  res.send(posts)
}
