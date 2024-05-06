"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require('express');
const userControllers_1 = require("../controllers/userControllers");
const checkAuthentication_1 = require("../middleware/checkAuthentication");
exports.userRouter = express.Router();
exports.userRouter.post('/', userControllers_1.createUser);
// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
exports.userRouter.get('/', checkAuthentication_1.checkAuthentication, userControllers_1.listUsers);
exports.userRouter.get('/:id', checkAuthentication_1.checkAuthentication, userControllers_1.showUser);
exports.userRouter.patch('/:id', checkAuthentication_1.checkAuthentication, userControllers_1.updateUser);
exports.default = exports.userRouter;
