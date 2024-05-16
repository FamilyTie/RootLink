import { Request, Response } from "express"
import {PostLike, CommentLike} from "../db/models/Likes"



export const getPostLikes = async (req: Request, res: Response) => {
  const likes = await PostLike.list()
  res.send(likes)
}

export const getCommentLikes = async (req: Request, res: Response) => {
  const likes = await CommentLike.list()
  res.send(likes)
}
export const createPostLike = async (req: Request, res: Response) => {
  const { post_id, profile_id } = req.body
  const like = await PostLike.create({ post_id, profile_id })
  res.send(like)
}

export const createCommentLike = async (req: Request, res: Response) => {
  const { comment_id, profile_id } = req.body
  const like = await CommentLike.create({ comment_id, profile_id })
  res.send(like)
}

export const deletePostLike = async (req: Request, res: Response) => {
    const { profile_id, post_id } = req.query;
  await PostLike.delete(Number(profile_id), Number(post_id) )
  res.sendStatus(204)
}

export const deleteCommentLike = async (req: Request, res: Response) => {
const { id, post_id } = req.query;
  await CommentLike.delete(Number(id), Number(post_id))
  res.sendStatus(204)
}

