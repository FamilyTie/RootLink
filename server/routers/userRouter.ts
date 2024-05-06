const express = require('express');
import { listUsers, showUser, updateUser, createUser } from '../controllers/userControllers';
import {checkAuthentication} from '../middleware/checkAuthentication'

export const userRouter = express.Router();
userRouter.post('/', createUser);

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
userRouter.get('/', checkAuthentication, listUsers);
userRouter.get('/:id', checkAuthentication, showUser);
userRouter.patch('/:id', checkAuthentication, updateUser);

export default userRouter
