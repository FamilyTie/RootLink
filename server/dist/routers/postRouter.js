"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express = require('express');
const postController_1 = require("../controllers/postController");
exports.postRouter = express.Router();
exports.postRouter.get('/', postController_1.getRecentPost);
exports.postRouter.get('/:profileId', postController_1.getRecentPostByProfile);
exports.default = exports.postRouter;
