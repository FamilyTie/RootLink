"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentLike = exports.deletePostLike = exports.createCommentLike = exports.createPostLike = exports.getCommentLikes = exports.getPostLikes = void 0;
const Likes_1 = require("../db/models/Likes");
const getPostLikes = async (req, res) => {
    const likes = await Likes_1.PostLike.list();
    res.send(likes);
};
exports.getPostLikes = getPostLikes;
const getCommentLikes = async (req, res) => {
    const likes = await Likes_1.CommentLike.list();
    res.send(likes);
};
exports.getCommentLikes = getCommentLikes;
const createPostLike = async (req, res) => {
    const { post_id, profile_id } = req.body;
    const like = await Likes_1.PostLike.create({ post_id, profile_id });
    res.send(like);
};
exports.createPostLike = createPostLike;
const createCommentLike = async (req, res) => {
    const { comment_id, profile_id } = req.body;
    const like = await Likes_1.CommentLike.create({ comment_id, profile_id });
    res.send(like);
};
exports.createCommentLike = createCommentLike;
const deletePostLike = async (req, res) => {
    const { profile_id, post_id } = req.query;
    await Likes_1.PostLike.delete(Number(profile_id), Number(post_id));
    res.sendStatus(204);
};
exports.deletePostLike = deletePostLike;
const deleteCommentLike = async (req, res) => {
    const { id, post_id } = req.query;
    await Likes_1.CommentLike.delete(Number(id), Number(post_id));
    res.sendStatus(204);
};
exports.deleteCommentLike = deleteCommentLike;
