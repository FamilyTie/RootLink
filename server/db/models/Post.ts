import { knex } from "../knex"

interface PostData {
  id?: number
  title: string
  body: string
  profile_id: number
  created_at?: Date
  updated_at?: Date
  img?: string
}

class Post {
  id?: number
  profileId: number
  title: string
  body: string
  createdAt: Date
  updatedAt: Date
  img?: string

  constructor(data: PostData) {
    this.id = data.id
    this.title = data.title
    this.body = data.body
    this.profileId = data.profile_id
    this.createdAt = data.created_at || new Date()
    this.updatedAt = data.updated_at || new Date()
    this.img = data.img
  }

  static async list(lastId: number) {
    try {
      const query = `
      SELECT 
      posts.id,
      posts.title,
      posts.body,
      posts.img AS post_image,
      profiles.img AS profile_photo,
      profiles.username,
      posts.comments_count,
      posts.likes_count,
      json_agg(json_build_object('profile_id', post_likes.profile_id, 'img', liker_profiles.img) ORDER BY post_likes.id DESC) AS new_likes
  FROM 
      posts
  LEFT JOIN 
      profiles ON posts.profile_id = profiles.id
  LEFT JOIN 
      post_likes ON posts.id = post_likes.post_id
  LEFT JOIN 
      profiles AS liker_profiles ON post_likes.profile_id = liker_profiles.id
  WHERE 
      posts.id > ?
  GROUP BY 
      posts.id, profiles.id
  ORDER BY 
      posts.id DESC
  LIMIT 
      20
  `
      const { rows } = await knex.raw(query, [lastId])
      console.log(rows)
      console.log("hello")
      return rows
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`)
    }
  }

  static async listByProfile(last_id: number, profile_id: number) {
    const query = `SELECT * FROM posts WHERE profile_id = ? ORDER BY id DESC LIMIT 20`
    const { rows } = await knex.raw(query, [profile_id])
    return rows.map((post: PostData) => new Post(post))
  }

  static async getLikedPostsIds(profile_id: number) {
    const query = `SELECT post_id FROM post_likes WHERE profile_id = ?`
    const { rows } = await knex.raw(query, [profile_id])
    const likedPostIds = rows.map((row: { post_id: number }) => row.post_id)
    return likedPostIds
  }

  static async findById(id: number) {
    const query = `SELECT * FROM posts WHERE id = ?`
    const { rows } = await knex.raw(query, [id])
    const post = rows[0]
    return post ? new Post(post) : null
  }

  static async create(data: Omit<PostData, "id">) {
    const query = `INSERT INTO posts (profile_id, title, body, created_at, updated_at, img)
            VALUES ( ?, ?, ?, ?, ?, ?) RETURNING *`
    const values = [
      data.profile_id,
      data.title,
      data.body,
      data.created_at || new Date(),
      data.updated_at || new Date(),
      data.img || null,
    ]
    const { rows } = await knex.raw(query, values)
    return new Post(rows[0])
  }

  static async update(id: number, data: Partial<PostData>) {
    const existingPost = await Post.findById(id)
    if (!existingPost) return null
    const updatedAt = new Date()
    const query = `UPDATE posts SET title = ?, body = ?, img = ?, updated_at = ? WHERE id = ? RETURNING *`
    const values = [
      data.title || existingPost.title,
      data.body || existingPost.body,
      data.img || existingPost.img, // Make sure to include the image update
      updatedAt,
      id,
    ]
    const { rows } = await knex.raw(query, values)
    return rows[0] ? new Post(rows[0]) : null
  }

  static async incrementLikes(id: number) {
    const query = `UPDATE posts SET likes_count = likes_count + 1 WHERE id = ? RETURNING *`
    const { rows } = await knex.raw(query, [id])
    return rows[0] // Return the updated row
  }

  static async decrementLikes(id: number) {
    const query = `UPDATE posts SET likes_count = likes_count - 1 WHERE id = ? RETURNING *`
    const { rows } = await knex.raw(query, [id])
    return rows[0] // Return the updated row
  }

  static async incrementComments(id: number) {
    const query = `UPDATE posts SET comments_count = comments_count + 1 WHERE id = ? RETURNING *`
    const { rows } = await knex.raw(query, [id])
    return rows[0] // Return the updated row
  }

  static async decrementComments(id: number) {
    const query = `UPDATE posts SET comments_count = comments_count - 1 WHERE id = ? RETURNING *`
    const { rows } = await knex.raw(query, [id])
    return rows[0] // Return the updated row
  }
}
export default Post
