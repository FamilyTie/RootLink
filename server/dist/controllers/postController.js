"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.getRecentPostByProfile = exports.getRecentPost = void 0;
const Post_1 = __importDefault(require("../db/models/Post"));
=======
exports.getRecentPostByProfile = exports.getRecentPost = exports.createPost = void 0;
const Post_1 = require("../db/models/Post");
const createPost = async (req, res) => {
    try {
        const { user_id, title, body, profile_id } = req.body;
        const newPost = await Post_1.default.create({ user_id, title, body, profile_id });
        res.status(201).json(newPost);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create post", error: error.toString() });
    }
};
exports.createPost = createPost;
>>>>>>> 586e5a448759ef991c2d4d9b71c113a49b56220f
const getRecentPost = async (req, res) => {
    const lastId = req.query.lastId;
    const posts = await Post_1.default.list(Number(lastId));
    res.send(posts);
};
exports.getRecentPost = getRecentPost;
const getRecentPostByProfile = async (req, res) => {
    const lastId = req.query.lastId;
    const profileId = req.params.profileId;
    const posts = await Post_1.default.listByProfile(Number(lastId), Number(profileId));
    res.send(posts);
};
exports.getRecentPostByProfile = getRecentPostByProfile;
