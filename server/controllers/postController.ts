import { Request, Response } from "express";
import {knex} from "../db/knex";

export const getRecentPost = async (req: Request, res: Response) => {
    try {
        const posts = await knex.raw(`
            SELECT *
            FROM posts
            ORDER BY created_at DESC
            LIMIT 20
        `);

        res.json(posts.rows);
    } catch (error) {
        console.error('Error fetching recent posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


