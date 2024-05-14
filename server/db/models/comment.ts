import { knex } from "../knex"

interface CommentData {
  id?: number
  user_id: number
  post_id: number
  comment_id?: number // Added comment_id for additional referencing
  body: string
  created_at?: Date
  updated_at?: Date
}

export class Comment {
  id?: number
  userId: number
  postId: number
  commentId?: number // used to reference parent comment
  body: string
  createdAt: Date
  updatedAt: Date

  constructor(data: CommentData) {
    this.id = data.id
    this.userId = data.user_id
    this.postId = data.post_id
    this.commentId = data.comment_id
    this.body = data.body
    this.createdAt = data.created_at || new Date()
    this.updatedAt = data.updated_at || new Date()
  }

  static async listByPost(last_id: number, post_id: number) {
    const query = `SELECT * FROM comments WHERE post_id = ? AND id > ? ORDER BY id DESC LIMIT 20`
    const { rows } = await knex.raw(query, [post_id, last_id])
    return rows.map((comment: CommentData) => new Comment(comment))
  }

  static async findById(id: number) {
    const query = `SELECT * FROM comments WHERE id = ?`
    const { rows } = await knex.raw(query, [id])
    const comment = rows[0]
    return comment ? new Comment(comment) : null
  }

  static async create(data: Omit<CommentData, "id">) {
    try {
      const query = `INSERT INTO comments (user_id, post_id, body, comment_id, created_at, updated_at)
                     VALUES (?, ?, ?, ?, ?, ?) RETURNING *`
      const values = [
        data.user_id,
        data.post_id,
        data.body,
        data.comment_id || null,
        data.created_at || new Date(),
        data.updated_at || new Date(),
      ]
      const { rows } = await knex.raw(query, values)
      return new Comment(rows[0])
    } catch (error) {
      console.error("Failed to create a comment:", error)
      // Optionally throw the error further up if handling errors globally
      throw error
    }
  }

  static async update(id: number, data: Partial<CommentData>) {
    const existingComment = await Comment.findById(id)
    if (!existingComment) return null
    const updatedAt = new Date()
    const query = `UPDATE comments SET body = ?, comment_id = ?, updated_at = ? WHERE id = ? RETURNING *`
    const values = [
      data.body || existingComment.body,
      data.comment_id || existingComment.commentId,
      updatedAt,
      id,
    ]
    const { rows } = await knex.raw(query, values)
    return rows[0] ? new Comment(rows[0]) : null
  }

  static async findAll(limit: number = 20) {
    const query = `SELECT * FROM comments ORDER BY created_at DESC LIMIT ?`
    const { rows } = await knex.raw(query, [limit])
    return rows.map((comment: CommentData) => new Comment(comment))
  }
}

export default Comment
