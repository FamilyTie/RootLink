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
    const { lastId } = req.query;
    let numericLastId = Number(lastId);
    // Check if lastId is NaN or undefined and handle it
    if (isNaN(numericLastId)) {
        numericLastId = 0; // or set it to a logic that fetches the most recent posts
    }
    try {
        const posts = await Post_1.default.list(numericLastId);
        res.send(posts);
    }
    catch (error) {
        console.error("Failed to fetch posts:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch posts", error: error.toString() });
    }
};
exports.getRecentPost = getRecentPost;
const getRecentPostByProfile = async (req, res) => {
    const lastId = req.query.lastId;
    const profileId = req.params.profileId;
    const posts = await Post_1.default.listByProfile(Number(lastId), Number(profileId));
    res.send(posts);
};
exports.getRecentPostByProfile = getRecentPostByProfile;
