"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _User_passwordHash;
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../knex");
const auth_utils_1 = require("../../utils/auth-utils");
class User {
    // This constructor is NOT how a controller creates a new user in the database.
    // Instead, it is used by each of the User static methods to hide the hashed
    // password of users before sending user data to the client. Since #passwordHash
    // is private, only the isValidPassword instance method can access that value.
    constructor({ id, username, password_hash }) {
        _User_passwordHash.set(this, null); // a private property
        // This instance method takes in a plain-text password and returns true if it matches
        // the User instance's hashed password.
        this.isValidPassword = async (password) => ((0, auth_utils_1.ValidPassword)(password, __classPrivateFieldGet(this, _User_passwordHash, "f")));
        this.id = id;
        this.username = username;
        this.passwordHash = password_hash;
    }
    static async list() {
        const query = `SELECT * FROM users`;
        const { rows } = await knex_1.knex.raw(query);
        // use the constructor to hide each user's passwordHash
        return rows.map((user) => new User(user));
    }
    static async find(id) {
        const query = `SELECT * FROM users WHERE id = ?`;
        const { rows } = await knex_1.knex.raw(query, [id]);
        const user = rows[0];
        return user ? new User(user) : null;
    }
    static async findByUsername(username) {
        const query = `SELECT * FROM users WHERE username = ?`;
        const { rows } = await knex_1.knex.raw(query, [username]);
        const user = rows[0];
        return user ? new User(user) : null;
    }
    static async create(username, password) {
        // hash the plain-text password using bcrypt before storing it in the database
        const passwordHash = await (0, auth_utils_1.hashPassword)(password);
        const query = `INSERT INTO users (username, password_hash)
      VALUES (?, ?) RETURNING *`;
        const { rows } = await knex_1.knex.raw(query, [username, passwordHash]);
        const user = rows[0];
        return new User(user);
    }
    // this is an instance method that we can use to update
    static async update(id, username) {
        const query = `
      UPDATE users
      SET username=?
      WHERE id=?
      RETURNING *
    `;
        const { rows } = await knex_1.knex.raw(query, [username, id]);
        const updatedUser = rows[0];
        return updatedUser ? new User(updatedUser) : null;
    }
    ;
    static async deleteAll() {
        return (0, knex_1.knex)('users').del();
    }
}
_User_passwordHash = new WeakMap();
exports.default = User;
