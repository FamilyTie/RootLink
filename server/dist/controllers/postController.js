"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.getRecentPostByProfile = exports.getRecentPost = exports.getLikedPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../db/models/Post"));
const createPost = async (req, res) => {
    try {
        const { title, body, profile_id, img } = req.body;
        const newPost = await Post_1.default.create({ title, body, profile_id, img });
        res.status(201).json(newPost);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create post", error: error.toString() });
    }
};
exports.createPost = createPost;
const getLikedPosts = async (req, res) => {
    const profileId = req.params.profileId;
    const likedPosts = await Post_1.default.getLikedPostsIds(Number(profileId));
    res.send(Array.from(likedPosts));
};
exports.getLikedPosts = getLikedPosts;
const getRecentPost = async (req, res) => {
    const { lastId } = req.query;
    let numericLastId = Number(lastId);
    // Check if lastId is NaN or undefined and handle it
    if (isNaN(numericLastId)) {
        numericLastId = 0; // or set it to a logic that fetches the most recent posts
    }
    try {
        const posts = await Post_1.default.list(numericLastId);
        console.log(posts);
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
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, img } = req.body;
        const updatedPost = await Post_1.default.update(Number(id), { title, body, img });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to update post", error: error.toString() });
    }
};
exports.updatePost = updatePost;
