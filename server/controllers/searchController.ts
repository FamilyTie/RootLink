//controller using the search service to get the search results
 import { Request, Response } from 'express';
import SearchService from '../db/models/Search';




export const search = async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send('Query parameter is required');
  }

  try {
    const results = await SearchService.search(query as string);
    res.send(results);
  } catch (error) {
    res.status(500).send(`Error fetching search results: ${error.message}`);
  }
}