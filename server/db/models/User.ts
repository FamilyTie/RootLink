
import { knex } from "../knex";
import { ValidPassword, hashPassword } from "../../utils/auth-utils";

   export interface UserConstructor {
    id: number
    username: string
    email: string
    password_hash: string
    role:string
    created_at: Date
   }


   class User {
    #passwordHash = null
    public id?: number 
    public username: string
    public email: string
    public role: string 
    public created_at: Date

    constructor(data: UserConstructor){
      this.id = data.id
      this.username = data.username
      this.email = data.email
      this.#passwordHash = data.password_hash
      this.role = data.role
      this.created_at = data.created_at
    }

   async isValidPassword(password:string): Promise<boolean>{
    return ValidPassword(password, this.#passwordHash)
   }


  static async list(): Promise<User[]> {
       const query = `SELECT * FROM users`
      const { rows } = await knex.raw(query);
      return rows.map((userData: UserConstructor) => new User(userData))
  }


static async findById(id: number) {
  const query = `SELECT * FROM users WHERE id = ?`
  const { rows } = await knex.raw(query, [id])
  const user = rows[0]
  return user ? new User(user) : null
}

static async findByUsername(username: string) {
  const query =  `SELECT * FROM users WHERE username = ?`
  const { rows } = await knex.raw(query, [username])
  const user = rows[0]
  return user ? new User(user) : null
}


static async create(data: Omit<UserConstructor, 'id'>) {
  const passwordHash = await hashPassword(data.password_hash)

  const query = `INSERT INTO users (username, password_hash, email, role, created_at)
  VALUES (?,?,?,?,? ) RETURNING *`

  const values = [
    data.username,
    passwordHash,
    data.email,
    data.role,
    data.created_at || new Date()
  ]

  const {rows} = await knex.raw(query, values)
  const user = rows[0]
  return new User(user)

}

static async update(id:number, data: Partial<UserConstructor> ) {
 const query = `UPDATE users SET username = ?, email = ?, role= ?, created_at =? WHERE id = ?  RETURNING *`
  const values = [
    data.username,
    data.email,
    data.role, 
    data.created_at || new Date()
  ]

  const {rows} = await knex.raw(query, values)
  const updatedUser = rows[0]
  return updatedUser ? new User(updatedUser) : null
}

   }

   export default User


   