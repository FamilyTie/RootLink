import { Knex } from "knex"
import User from "../models/User"
import Profile from "../models/Profile"
import Post from "../models/Post"
import Comment from "../models/comment"
import Chatrooms from "../models/ChatRooms"

export async function seed(knex: Knex): Promise<void> {
  try {
    console.log("Cleaning up database...")
    // Deletes ALL existing entries in the correct order
    await knex("comment_likes").del()
    await knex("comments").del()
    await knex("post_likes").del()
    await knex("posts").del()
    await knex("profiles").del()
    await knex("users").del()

    console.log("Inserting users...")
    // Inserts seed entries for users
    const user1 = await User.create({
      email: "user1@gmail.com",
      password: "hashed_password1",
    })
    const user2 = await User.create({
      email: "user2@gmail.com",
      password: "hashed_password2",
    })

    console.log(`User 1 ID: ${user1.id}, User 2 ID: ${user2.id}`)

    console.log("Inserting profiles...")
    // Inserts seed entries for profiles
    const profile1 = await Profile.create({
      user_id: user1.id,
      username: "user1",
      full_name: "User One",
      bio: "I am user",
      account_type: "regular",
    })
    const profile2 = await Profile.create({
      user_id: user2.id,
      username: "user2",
      full_name: "User Two",
      bio: "I am user",
      account_type: "regular",
    })

    console.log(`Profile 1 ID: ${profile1.id}, Profile 2 ID: ${profile2.id}`)

    console.log("Inserting posts...")
    // Inserts seed entries for posts
    const post1 = await Post.create({
      user_id: user1.id,
      profile_id: profile1.id,
      title: "lonely",
      body: `[{"id":"b774c317-fb12-418f-a0f8-0723a784b598","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsafasfas","styles":{}}],"children":[]}]`,
      created_at: new Date(),
    })
    const post2 = await Post.create({
      user_id: user1.id,
      profile_id: profile1.id,
      title: "hey",
      body: `[{"id":"b774c317-fb12-418f-a0f8-0723a784b598","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsafasfas","styles":{}}],"children":[]}]`,
      created_at: new Date(),
    })

    console.log(`Post 1 ID: ${post1.id}, Post 2 ID: ${post2.id}`)

    // console.log("Inserting comments...")
    // Inserts seed entries for comments
    await Chatrooms.createChatRoom(user1.id, user2.id)
  } catch (error) {
    console.error("Error during seeding:", error)
  }
}
