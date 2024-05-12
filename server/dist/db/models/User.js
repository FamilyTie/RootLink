"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
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
    constructor(data) {
        _User_passwordHash.set(this, null);
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        __classPrivateFieldSet(this, _User_passwordHash, data.password_hash, "f");
        this.role = data.role;
        this.created_at = data.created_at;
    }
    async isValidPassword(password) {
        return (0, auth_utils_1.ValidPassword)(password, __classPrivateFieldGet(this, _User_passwordHash, "f"));
    }
    static async list() {
        const query = `SELECT * FROM users`;
        const { rows } = await knex_1.knex.raw(query);
        return rows.map((userData) => new User(userData));
    }
    static async findById(id) {
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
    static async create(data) {
        const passwordHash = await (0, auth_utils_1.hashPassword)(data.password_hash);
        const query = `INSERT INTO users (username, password_hash, email, role, created_at)
  VALUES (?,?,?,?,? ) RETURNING *`;
        const values = [
            data.username,
            passwordHash,
            data.email,
            data.role,
            data.created_at || new Date()
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        const user = rows[0];
        return new User(user);
    }
    static async update(id, data) {
        const query = `UPDATE users SET username = ?, email = ?, role= ?, created_at =? WHERE id = ?  RETURNING *`;
        const values = [
            data.username,
            data.email,
            data.role,
            data.created_at || new Date()
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        const updatedUser = rows[0];
        return updatedUser ? new User(updatedUser) : null;
    }
}
_User_passwordHash = new WeakMap();
exports.default = User;
