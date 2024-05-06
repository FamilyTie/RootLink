"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const authControllers = require('../controllers/authControllers');
const authRouter = express.Router();
authRouter.get('/me', authControllers.showMe);
authRouter.post('/login', authControllers.loginUser);
authRouter.delete('/logout', authControllers.logoutUser);
exports.default = authRouter;
