"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentPostByProfile = exports.getRecentPost = void 0;
const Post_1 = require("../db/models/Post");
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
