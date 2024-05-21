
import { knex } from "../knex"
import Post from "./Post"
import Comment from "./comment"
interface PostLikeData {
    id: number
    post_id: number
    profile_id: number
}

interface CommentLikeData {
    id: number
    comment_id: number
    profile_id: number
}


export class PostLike {
    id: number
    postId: number
    profileId: number

    constructor(data: PostLikeData) {
        this.id = data.id
        this.postId = data.post_id
        this.profileId = data.profile_id

    }

    static async list() {
        const query = `SELECT * FROM post_likes`
        const { rows } = await knex.raw(query)
        return rows.map((postLike: PostLikeData) => new PostLike(postLike))
    }

    static async list3() {
        //list only 3 recent likes
        const query = `SELECT * FROM post_likes ORDER BY id DESC LIMIT 3`
        const { rows } = await knex.raw(query)
        return rows.map((postLike: PostLikeData) => new PostLike(postLike))
    }
    static async getByPostId(post_id: number) {
        const query = `SELECT * FROM post_likes WHERE post_id = ?`
        const { rows } = await knex.raw(query, [post_id])
        return rows.map((postLike: PostLikeData) => new PostLike(postLike))

    }

    static async create(data: Omit<PostLikeData, "id">) {
        const query = `INSERT INTO post_likes (post_id, profile_id)
            VALUES (?, ?) RETURNING *`
        const values = [
            data.post_id,
            data.profile_id
        ]
        const { rows } = await knex.raw(query, values)
        Post.incrementLikes(data.post_id)
        return new PostLike(rows[0])
    }

    static async delete(profile_id: number, post_id: number) {
        const query = `DELETE FROM post_likes WHERE profile_id = ? and post_id = ?`
        await knex.raw(query, [profile_id, post_id])
        Post.decrementLikes(post_id)
    }


}

export class CommentLike {
    id: number
    commentId: number
    profileId: number

    constructor(data: CommentLikeData) {
        this.id = data.id
        this.commentId = data.comment_id
        this.profileId = data.profile_id

    }

    static async list() {
        const query = `SELECT * FROM comment_likes`
        const { rows } = await knex.raw(query)
        return rows.map((commentLike: CommentLikeData) => new CommentLike(commentLike))
    }

    static async getByCommentId(comment_id: number) {
        const query = `SELECT * FROM comment_likes WHERE comment_id = ?`
        const { rows } = await knex.raw(query, [comment_id])
        return rows.map((commentLike: CommentLikeData) => new CommentLike(commentLike))

    }

    static async create(data: Omit<CommentLikeData, "id">) {
        const query = `INSERT INTO comment_likes (comment_id, profile_id)
            VALUES (?, ?) RETURNING *`
        const values = [
            data.comment_id,
            data.profile_id
        ]
        const { rows } = await knex.raw(query, values)
        Comment.incrementLikes(data.comment_id)
        return new CommentLike(rows[0])
    }

    static async delete(id: number, comment_id: number) {
        const query = `DELETE FROM comment_likes WHERE id = ?`
        await knex.raw(query, [id])
        Comment.decrementLikes(comment_id)
    }

}

