import { Request, Response } from "express"
import { Comment } from "../db/models/comment"
import { knex } from "../db/knex"
export const createComment = async (req: Request, res: Response) => {
  const { post_id, comment_id, profile_id, body } = req.body
  console.log(req.body)
  try {
    // code to insert a comment
  } catch (error) {
    if (error.code === "23503") {
      // PostgreSQL error code for foreign key violation
      return res.status(400).json({ message: "Post does not exist." })
    }
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
  // Check if the post exists
  const postExists = await knex("posts").where("id", post_id).first()
  if (!postExists) {
    return res.status(404).json({ message: "Post not found" })
  }

  try {
    const newComment = await Comment.create({
      post_id,
      comment_id,
      profile_id,
      body,
    })
    res.status(201).json(newComment)
  } catch (error) {
    if (error.code === "23503") {
      // PostgreSQL foreign key violation error code
      res.status(400).json({ message: "Invalid post_id: No such post exists." })
    } else {
      res
        .status(500)
        .json({ message: "Failed to create comment", error: error.toString() })
    }
  }
}

export const getCommentsByPost = async (req: Request, res: Response) => {
  // Extract query parameters with defaults
  let { lastId = "0", post_Id } = req.query

  // Handle missing postId
  if (!post_Id) {
    return res.status(400).json({
      message: "Missing 'postId': 'postId' must be provided.",
    })
  }

  // Convert to numbers
  let numericLastId = Number(lastId)
  let numericPostId = Number(post_Id)

  // Validate numeric values
  if (isNaN(numericLastId) || isNaN(numericPostId)) {
    return res.status(400).json({
      message: "Invalid input: 'lastId' and 'postId' must be valid integers.",
    })
  }

  try {
    const comments = await Comment.listByPost(numericLastId, numericPostId)
    res.send(comments)
  } catch (error) {
    console.error("Failed to fetch comments:", error)
    res.status(500).json({
      message: "Failed to fetch comments",
      error: error.toString(),
    })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body, comment_id } = req.body
  try {
    const updatedComment = await Comment.update(Number(id), {
      body,
      comment_id,
    })
    if (updatedComment) {
      res.json(updatedComment)
    } else {
      res.status(404).json({ message: "Comment not found" })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update comment", error: error.toString() })
  }
}
