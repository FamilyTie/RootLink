import { knex } from '../knex'

interface PostData {
    id?: number,
    user_id: number,
    title: string,
    body: string,
    profile_id: number,
    created_at?: Date,
    updated_at?: Date
}

class Post {
    id?: number
    userId: number
    title: string
    body: string
    profileId: number
    createdAt: Date
    updatedAt: Date

    constructor(data: PostData) {
        this.id = data.id
        this.userId = data.user_id
        this.title = data.title
        this.body = data.body
        this.profileId = data.profile_id
        this.createdAt = data.created_at || new Date()
        this.updatedAt = data.updated_at || new Date()
    }

    static async list(last_id: number) {
        const query = `SELECT * FROM posts WHERE id > ? SORT BY id DESC LIMIT 20`
        const { rows } = await knex.raw(query, [last_id])
        return rows.map((post: PostData) => new Post(post))
    }
US
    static async listByProfile(last_id: number, profile_id: number) {
        const query = `SELECT * FROM posts WHERE profile_id = ? SORT BY id DESC LIMIT 20`
        const { rows } = await knex.raw(query, [profile_id])
        return rows.map((post: PostData) => new Post(post))
    }

    static async findById(id: number) {
        const query = `SELECT * FROM posts WHERE id = ?`
        const { rows } = await knex.raw(query, [id])
        const post = rows[0]
        return post ? new Post(post) : null
    }

    static async create(data: Omit<PostData, 'id'>) {
        const query = `INSERT INTO posts (user_id, title, body, profile_id, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?) RETURNING *`
        const values = [
            data.user_id,
            data.title,
            data.body,
            data.profile_id,
            data.created_at || new Date(),
            data.updated_at || new Date()
        ]
        const { rows } = await knex.raw(query, values)
        return new Post(rows[0])
    }

    static async update(id: number, data: Partial<PostData>) {
        const existingPost = await Post.findById(id);
        if (!existingPost) return null;
        const updatedAt = new Date();
        const query = `UPDATE posts SET title = ?, body = ?, updated_at = ? WHERE id = ? RETURNING *`;
        const values = [
          data.title || existingPost.title,
          data.body || existingPost.body,
          updatedAt,
          id,
        ];
        const { rows } = await knex.raw(query, values);
        return rows[0] ? new Post(rows[0]) : null;
    }
}
export default Post