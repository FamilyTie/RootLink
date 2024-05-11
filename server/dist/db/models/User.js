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
const multer = require('multer');
class User {
    constructor(data) {
        _User_passwordHash.set(this, null);
        this.id = data.id;
        this.email = data.email;
        __classPrivateFieldSet(this, _User_passwordHash, data.password_hash, "f");
        this.img = data.img;
        this.updated_at = data.updated_at;
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
    static async findByEmail(email) {
        const query = `SELECT * FROM users WHERE username = ?`;
        const { rows } = await knex_1.knex.raw(query, [email]);
        const user = rows[0];
        return user ? new User(user) : null;
    }
    static async create(data) {
        const passwordHash = await (0, auth_utils_1.hashPassword)(data.password_hash);
        const query = `INSERT INTO users (email, password_hash, img, created_at, updated_at)
  VALUES (?,?,?,?,? ) RETURNING *`;
        const values = [
            data.email,
            passwordHash,
            '../..',
            data.created_at || new Date(),
            data.updated_at || new Date()
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        const user = rows[0];
        return new User(user);
    }
    static async createWithImage(data, imagePath) {
        try {
            const passwordHash = await (0, auth_utils_1.hashPassword)(data.password_hash);
            const query = `INSERT INTO users (email, password_hash, img, created_at, updated_at)
      VALUES (?,?,?,?,? ) RETURNING *`;
            const values = [
                data.email,
                passwordHash,
                imagePath,
                data.created_at || new Date(),
                data.updated_at || new Date()
            ];
            const { rows } = await knex_1.knex.raw(query, values);
            const user = rows[0];
            return new User(user);
        }
        catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }
    static async update(id, data) {
        const query = `UPDATE users SET username = ?, email = ?, role= ?, created_at =? WHERE id = ?  RETURNING *`;
        const values = [
            data.email,
            data.img,
            data.created_at || new Date(),
            data.updated_at || new Date()
        ];
        const { rows } = await knex_1.knex.raw(query, values);
        const updatedUser = rows[0];
        return updatedUser ? new User(updatedUser) : null;
    }
}
_User_passwordHash = new WeakMap();
exports.default = User;
