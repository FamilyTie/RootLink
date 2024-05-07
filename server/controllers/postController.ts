import { Request, Response } from "express";
import knex from "knex";

export const getRecentPost = async (req: Request, res:Response) => {
    try {
        const posts = await knex('posts')
        .select('*')
        .orderBy('created_at', 'desc')
        .limit(20)
 
        res.json(posts)
    } catch (error) {
        console.error('Error fetching recent posts:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}