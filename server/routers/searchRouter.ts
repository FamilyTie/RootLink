//router for search funcionality 

import express from 'express';
import { search } from '../controllers/searchController';

export const searchRouter = express.Router();

searchRouter.get('/', search);
