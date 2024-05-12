
import { knex } from "../knex";
import { ValidPassword, hashPassword } from "../../utils/auth-utils";

   export interface UserConstructor {
    id: number
    username?: string
    email: string
    password_hash: string
    created_at: Date
    updated_at: Date
   }


   class User {
    #passwordHash = null
    public id?: number 
    public username: string
    public email: string
    public created_at: Date
    public updated_at: Date

    constructor(data: UserConstructor){
      this.id = data.id
      this.username = data.username
      this.email = data.email
      this.#passwordHash = data.password_hash
      this.created_at = data.created_at
      this.updated_at = data.updated_at
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
static async findByEmail(email: string) {
  const query = `SELECT * FROM users WHERE email = ?`
  const { rows } = await knex.raw(query, [email])
  const user = rows[0]
  return user ? new User(user) : null
}

// static async create(data: Omit<UserConstructor, 'id'>) {
//   const passwordHash = await hashPassword(data.password_hash)

//   const query = `INSERT INTO users ( username, password_hash, email, created_at, updated_at)
//   VALUES (?,?,?,?,? ) RETURNING *`

//   const values = [
//     data.username,
//     passwordHash,
//     data.email,
//     data.created_at || new Date(),
//     data.updated_at || new Date()
//   ]

//   const {rows} = await knex.raw(query, values)
//   const user = rows[0]
//   return new User(user)

// }

static async create(data: { email: string; password: string }) {
  const passwordHash = await hashPassword(data.password);

  const query = `
    INSERT INTO users (password_hash, email, created_at, updated_at)
    VALUES (?, ?, ?, ?)
    RETURNING *
  `;

  const values = [
    data.email,
    passwordHash,
    new Date(),
    new Date()
  ];

  const { rows } = await knex.raw(query, values);
  const user = rows[0];
  return new User(user);
}


static async update(id:number, data: Partial<UserConstructor> ) {
 const query = `UPDATE users SET username = ?, email = ?, updated_at, created_at =? WHERE id = ?  RETURNING *`
  const values = [
    data.username,
    data.email,
    data.created_at || new Date(),
    data.updated_at || new Date()
  ]

  const {rows} = await knex.raw(query, values)
  const updatedUser = rows[0]
  return updatedUser ? new User(updatedUser) : null
}

   }

   export default User


   