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
    const chatRoom1 = await Chatrooms.createChatRoom(user1.id, user2.id)
    await Chatrooms.addMessage(
      chatRoom1.id,
      user1.id,
      `{"8c04e81a-d751-4b4c-9ea8-af853a31bb01":{"id":"8c04e81a-d751-4b4c-9ea8-af853a31bb01","type":"NumberedList","meta":{"order":0,"depth":0},"value":[{"id":"f87bd950-060e-49cb-b5ea-c9924c54c8c1","type":"numbered-list","children":[{"text":"testing message n stuff "}],"props":{"nodeType":"block"}}]},"597fb6f2-a802-45c4-a3ae-ce5a8fc9e079":{"id":"597fb6f2-a802-45c4-a3ae-ce5a8fc9e079","value":[{"id":"46d5fa4e-ec9e-4ad8-a627-974dc2793aac","type":"numbered-list","children":[{"text":"yessir ","strike":true}],"props":{"nodeType":"block"}}],"type":"NumberedList","meta":{"order":1,"depth":0}},"1fb05d1f-197e-4ffa-bcc7-28f446605caa":{"id":"1fb05d1f-197e-4ffa-bcc7-28f446605caa","value":[{"id":"996ab609-1095-4ba2-b15a-828e687ab436","type":"numbered-list","children":[{"text":"trueeeee"},{"text":"eeeeee","bold":true}],"props":{"nodeType":"block"}}],"type":"NumberedList","meta":{"order":2,"depth":0}},"e642c019-6734-46e7-8bdb-13af2aaeebc6":{"id":"e642c019-6734-46e7-8bdb-13af2aaeebc6","type":"Blockquote","meta":{"order":3,"depth":0},"value":[{"id":"e80a2940-db9d-446c-ba38-28b6b1184069","type":"blockquote","children":[{"text":"damn"}],"props":{"nodeType":"block"}}]}}`
    )
    // await Chatrooms.addMessage(chatRoom1.id, user2.id, `what's good???`)
    // await Chatrooms.addMessage(
    //   chatRoom1.id,
    //   user1.id,
    //   `just reading documentation`
    // )
  } catch (error) {
    console.error("Error during seeding:", error)
  }
}
