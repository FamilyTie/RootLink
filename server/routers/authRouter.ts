const express = require('express');
import { showMe, loginUser, logoutUser } from "../controllers/authControllers";
const authControllers = require('../controllers/authControllers');

const authRouter = express.Router();

authRouter.get('/me', showMe);
authRouter.post('/login', loginUser);
authRouter.delete('/logout', logoutUser);

export default authRouter;
