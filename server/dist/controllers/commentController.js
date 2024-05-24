"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentById = exports.updateComment = exports.getCommentsByPost = exports.getAllComments = exports.createComment = void 0;
const comment_1 = require("../db/models/comment");
const knex_1 = require("../db/knex");
const createComment = async (req, res) => {
    const { profile_id, post_id, body, comment_id } = req.body;
    // First, check if the post exists to ensure the foreign key relation will hold.
    const postExists = await (0, knex_1.knex)("posts").where("id", post_id).first();
    if (!postExists) {
        return res.status(404).json({ message: "Post not found" });
    }
    try {
        const newComment = await comment_1.Comment.create({
            profile_id,
            post_id,
            body,
            comment_id,
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        if (error.code === "23503") {
            res.status(400).json({
                message: "Invalid user_id, post_id, or comment_id: No such user, post, or comment exists.",
            });
        }
        else {
            console.error(error);
            res
                .status(500)
                .json({ message: "Failed to create comment", error: error.toString() });
        }
    }
};
exports.createComment = createComment;
const getAllComments = async (req, res) => {
    try {
        const comments = await comment_1.Comment.findAll();
        res.status(200).json(comments);
    }
    catch (error) {
        console.error("Failed to fetch all comments:", error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.toString() });
    }
};
exports.getAllComments = getAllComments;
const getCommentsByPost = async (req, res) => {
    const { lastId = "0", postId } = req.query;
    if (!postId) {
        return res
            .status(400)
            .json({ message: "Missing 'postId': 'postId' must be provided." });
    }
    const numericLastId = parseInt(lastId, 10);
    const numericPostId = parseInt(postId, 10);
    if (isNaN(numericLastId) || isNaN(numericPostId)) {
        return res.status(400).json({
            message: "Invalid input: 'lastId' and 'postId' must be valid integers.",
        });
    }
    try {
        const comments = await comment_1.Comment.listByPost(numericLastId, numericPostId);
        res.status(200).json(comments);
    }
    catch (error) {
        console.error("Failed to fetch comments:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch comments", error: error.toString() });
    }
};
exports.getCommentsByPost = getCommentsByPost;
const updateComment = async (req, res) => {
    const { id } = req.params;
    const { body, comment_id } = req.body;
    try {
        const updatedComment = await comment_1.Comment.update(Number(id), {
            body,
            comment_id,
        });
        if (updatedComment) {
            res.json(updatedComment);
        }
        else {
            res.status(404).json({ message: "Comment not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to update comment", error: error.toString() });
    }
};
exports.updateComment = updateComment;
const deleteCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        await comment_1.Comment.delete(parseInt(id));
        res.status(200).send({ message: "Comment deleted successfully." });
    }
    catch (error) {
        res.status(500).send({ error: "Failed to delete comment." });
    }
};
exports.deleteCommentById = deleteCommentById;
