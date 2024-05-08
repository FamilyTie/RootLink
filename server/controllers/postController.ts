import { Request, Response } from "express";
import {knex} from "../db/knex";
import Post from "../db/models/Post";


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