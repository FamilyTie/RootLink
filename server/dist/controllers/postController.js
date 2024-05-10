"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
