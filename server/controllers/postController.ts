import { Request, Response } from "express"
import Post from "../db/models/Post"

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, profile_id, img } = req.body
    const newPost = await Post.create({ title, body, profile_id, img })
    res.status(201).json(newPost)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.toString() })
  }
}

export const getLikedPosts = async (req: Request, res: Response) => {
  const profileId = req.params.profileId
  const likedPosts = await Post.getLikedPostsIds(Number(profileId))
  res.send(Array.from(likedPosts))
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
    console.log(posts)

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

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, body, img } = req.body
    const updatedPost = await Post.update(Number(id), { title, body, img })
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" })
    }
    res.status(200).json(updatedPost)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update post", error: error.toString() })
  }
}
