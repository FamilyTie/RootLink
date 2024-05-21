import { Request, Response } from "express";
import axios from "axios";
import dotenv from 'dotenv';
export const fetchAutoCompleteLocations = async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.locationiq.com/v1/autocomplete.php', {
          params: {
            key: process.env.LOC_API_KEY, // Replace with your actual API key
            q: req.query.q,
            format: 'json',
            limit: 5
          }
        });
        res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from LocationIQ' });
      }
};