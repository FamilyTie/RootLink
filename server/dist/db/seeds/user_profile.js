"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("profiles").del();
    await knex("users").del();
    // Inserts seed entries
    await User_1.default.create({
        email: "user1@gmail.com",
        password: "hashed_password1"
    });
    await User_1.default.create({
        email: "user2@gmail.com",
        password: "hashed_password2"
    });
    await Profile_1.default.create({
        user_id: 1,
        username: "user1",
        full_name: "User One",
        account_type: "regular",
        bio: "I am user"
    });
    await Profile_1.default.create({
        user_id: 2,
        username: "user2",
        full_name: "User Two",
        account_type: "",
        bio: "I am user"
    });
}
exports.seed = seed;
;
