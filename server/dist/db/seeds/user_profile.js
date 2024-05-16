"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
const Post_1 = __importDefault(require("../models/Post"));
const ChatRooms_1 = __importDefault(require("../models/ChatRooms"));
async function seed(knex) {
    try {
        console.log("Cleaning up database...");
        // Deletes ALL existing entries in the correct order
        await knex("comment_likes").del();
        await knex("comments").del();
        await knex("post_likes").del();
        await knex("posts").del();
        await knex("profiles").del();
        await knex("users").del();
        console.log("Inserting users...");
        // Inserts seed entries for users
        const user1 = await User_1.default.create({
            email: "user1@gmail.com",
            password: "hashed_password1",
        });
        const user2 = await User_1.default.create({
            email: "user2@gmail.com",
            password: "hashed_password2",
        });
        console.log(`User 1 ID: ${user1.id}, User 2 ID: ${user2.id}`);
        console.log("Inserting profiles...");
        // Inserts seed entries for profiles
        const profile1 = await Profile_1.default.create({
            user_id: user1.id,
            username: "user1",
            full_name: "User One",
            bio: "I am user",
            account_type: "regular",
        });
        const profile2 = await Profile_1.default.create({
            user_id: user2.id,
            username: "user2",
            full_name: "User Two",
            bio: "I am user",
            account_type: "regular",
        });
        console.log(`Profile 1 ID: ${profile1.id}, Profile 2 ID: ${profile2.id}`);
        console.log("Inserting posts...");
        // Inserts seed entries for posts
        const post1 = await Post_1.default.create({
            profile_id: profile1.id,
            title: "lonely",
            body: `[{"id":"b774c317-fb12-418f-a0f8-0723a784b598","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsafasfas","styles":{}}],"children":[]}]`,
            created_at: new Date(),
        });
        const post2 = await Post_1.default.create({
            profile_id: profile1.id,
            title: "hey",
            body: `[{"id":"b774c317-fb12-418f-a0f8-0723a784b598","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsafasfas","styles":{}}],"children":[]}]`,
            created_at: new Date(),
        });
        console.log(`Post 1 ID: ${post1.id}, Post 2 ID: ${post2.id}`);
        // console.log("Inserting comments...")
        // Inserts seed entries for comments
        await ChatRooms_1.default.createChatRoom(user1.id, user2.id);
    }
    catch (error) {
        console.error("Error during seeding:", error);
    }
}
exports.seed = seed;
