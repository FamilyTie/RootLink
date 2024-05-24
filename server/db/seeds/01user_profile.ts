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

    const users = [
      { email: "alice@example.com", password: "password123" },
      { email: "john@example.com", password: "password123" },
      { email: "maria@example.com", password: "password123" },
      { email: "luisa@example.com", password: "password123" },
      { email: "james@example.com", password: "password123" },
      { email: "kim@example.com", password: "password123" },
      { email: "david@example.com", password: "password123" },
      { email: "sandra@example.com", password: "password123" },
      { email: "sophia@example.com", password: "password123" },
      { email: "rebecca@example.com", password: "password123" },
      { email: "michael@example.com", password: "password123" },
      { email: "linda@example.com", password: "password123" },
      { email: "emma@example.com", password: "password123" },
      { email: "mark@example.com", password: "password123" },
      { email: "robert@example.com", password: "password123" },
      { email: "susan@example.com", password: "password123" },
      { email: "daniel@example.com", password: "password123" },
      { email: "patricia@example.com", password: "password123" },
      { email: "linda_b@example.com", password: "password123" },
      { email: "thomas@example.com", password: "password123" },
    ]

    for (const user of users) {
      await User.create(user)
    }

    const createdUsers = await knex("users").select("id", "email")
    const userMap = createdUsers.reduce((map, user) => {
      map[user.email] = user.id
      return map
    }, {})

    const profiles = [
      {
        img: "https://randomuser.me/api/portraits/women/44.jpg",
        user_id: userMap["alice@example.com"],
        username: "alice_wonder",
        full_name: "Alice Smith",
        bio: "I was adopted as a baby in 1995 and have always wondered about my birth family. I know that I am of Caucasian descent and have a passion for genealogy. I would love to connect with my biological relatives to learn more about my roots and share my journey with them.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Caucasian", adoptionYear: "1995" } },
      },
      {
        img: "https://randomuser.me/api/portraits/men/45.jpg",
        user_id: userMap["john@example.com"],
        username: "john_doe_seeker",
        full_name: "John Johnson",
        bio: "I am a birth father looking for my son who was adopted in 2000. I am of Hispanic ethnicity and have been searching for years. I hope to reconnect with him and share our family’s history and culture. I want him to know that I have always loved him and think about him every day.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Hispanic", adoptionYear: "2000" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/46.jpg",
        user_id: userMap["maria@example.com"],
        username: "maria_gonzalez98",
        full_name: "Maria Gonzalez",
        bio: "Adopted at age five, I have vague memories of my birth family. I am of Hispanic descent and was adopted in 1998. I’m hoping to find my biological siblings and parents to understand more about my heritage and the circumstances of my adoption.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Hispanic", adoptionYear: "1998" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/47.jpg",
        user_id: userMap["luisa@example.com"],
        username: "luisa_heart",
        full_name: "Luisa Martinez",
        bio: "As a young mother, I made the difficult decision to place my daughter for adoption in 1998. I am of Hispanic ethnicity and have always hoped to reconnect with her someday. I want her to know that she has always been in my heart and that I am here, ready to welcome her into my life whenever she is ready.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Hispanic", adoptionYear: "1998" } },
      },
      {
        img: "https://randomuser.me/api/portraits/men/48.jpg",
        user_id: userMap["james@example.com"],
        username: "james_lee90",
        full_name: "James Lee",
        bio: "I was adopted in 1990 and have always been curious about my Asian heritage. I hope to find my birth parents and siblings to learn more about my cultural background and family history. Connecting with them would mean the world to me as I seek to piece together my past.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Asian", adoptionYear: "1990" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/49.jpg",
        user_id: userMap["kim@example.com"],
        username: "kim_nguyen_seeker",
        full_name: "Kim Nguyen",
        bio: "I am a birth mother searching for my son who was adopted in 1990. I am of Asian ethnicity and have been looking for him ever since. I hope to reunite with him and share our family’s traditions and stories. He has always been a part of my heart, and I long to see him again.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Asian", adoptionYear: "1990" } },
      },
      {
        img: "https://randomuser.me/api/portraits/men/50.jpg",
        user_id: userMap["david@example.com"],
        username: "david_brown85",
        full_name: "David Brown",
        bio: "I was adopted in 1985 and am of Black/African descent. I’ve always felt a part of me was missing, and I hope to find my birth family to fill that void. Learning about my roots and heritage is important to me, and I hope to connect with those who share my story.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Black/African", adoptionYear: "1985" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/50.jpg",
        user_id: userMap["sandra@example.com"],
        username: "sandra_green",
        full_name: "Sandra Green",
        bio: "I am a birth mother who placed my son for adoption in 1985. I am of Black/African ethnicity and have always hoped to reconnect with him. I want him to know that I have never forgotten him and that I am ready to welcome him with open arms whenever he is ready.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Black/African", adoptionYear: "1985" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/51.jpg",
        user_id: userMap["sophia@example.com"],
        username: "sophia_white05",
        full_name: "Sophia White",
        bio: "Adopted as a baby in 2005, I have always been curious about my Native American heritage. I want to learn more about my culture and connect with my birth family to understand my roots and traditions. It’s a journey I’ve been longing to take for a long time.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Native American", adoptionYear: "2005" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/52.jpg",
        user_id: userMap["rebecca@example.com"],
        username: "rebecca_grey",
        full_name: "Rebecca Grey",
        bio: "I am a birth mother looking for my daughter who was adopted in 2005. I am of Native American descent and have always wanted to reconnect with her. I want to share our family’s rich history and traditions with her and let her know she has always been loved and missed.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Native American", adoptionYear: "2005" } },
      },
      {
        img: "https://randomuser.me/api/portraits/men/52.jpg",
        user_id: userMap["michael@example.com"],
        username: "michael_johnson92",
        full_name: "Michael Johnson",
        bio: "I was adopted in 1992 and am of Caucasian ethnicity. I’ve always felt a connection to my birth family and have been searching for them for years. I hope to find them and learn more about my heritage and the story of my adoption.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Caucasian", adoptionYear: "1992" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/53.jpg",
        user_id: userMap["linda@example.com"],
        username: "linda_adams",
        full_name: "Linda Adams",
        bio: "I am a birth mother searching for my son who was adopted in 1992. I am of Caucasian ethnicity and have always hoped to reconnect with him. I want him to know that he has always been in my heart and that I am here, ready to welcome him back into my life.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Caucasian", adoptionYear: "1992" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/54.jpg",
        user_id: userMap["emma@example.com"],
        username: "emma_wilson97",
        full_name: "Emma Wilson",
        bio: "Adopted in 1997, I am of Pacific Islander descent. I’ve always felt a connection to my birth family and hope to find them to learn more about my cultural heritage and the story behind my adoption. Connecting with them would mean everything to me.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Pacific Islander", adoptionYear: "1997" } },
      },
      {
        img: "https://randomuser.me/api/portraits/men/54.jpg",
        user_id: userMap["mark@example.com"],
        username: "mark_james",
        full_name: "Mark James",
        bio: "I am a birth father searching for my daughter who was adopted in 1997. I am of Pacific Islander ethnicity and have always hoped to reconnect with her. I want to share our family’s traditions and stories with her and let her know she has always been loved and missed.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Pacific Islander", adoptionYear: "1997" } },
      },
      {
        img: "https://randomuser.me/api/portraits/men/55.jpg",
        user_id: userMap["robert@example.com"],
        username: "robert_carter89",
        full_name: "Robert Carter",
        bio: "I was adopted in 1989 and am of Native American descent. I have always felt a part of me was missing, and I hope to find my birth family to fill that void. Learning about my roots and heritage is important to me, and I hope to connect with those who share my story.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Native American", adoptionYear: "1989" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/55.jpg",
        user_id: userMap["susan@example.com"],
        username: "susan_hall",
        full_name: "Susan Hall",
        bio: "I am a birth mother who placed my son for adoption in 1989. I am of Native American ethnicity and have always hoped to reconnect with him. I want him to know that I have never forgotten him and that I am ready to welcome him with open arms whenever he is ready.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Native American", adoptionYear: "1989" } },
      },
      {
        img: "https://randomuser.me/api/portraits/men/56.jpg",
        user_id: userMap["daniel@example.com"],
        username: "daniel_anderson93",
        full_name: "Daniel Anderson",
        bio: "Adopted in 1993, I am of Black/African descent. I’ve always felt a connection to my birth family and have been searching for them for years. I hope to find them and learn more about my heritage and the story of my adoption.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Black/African", adoptionYear: "1993" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/56.jpg",
        user_id: userMap["patricia@example.com"],
        username: "patricia_clark",
        full_name: "Patricia Clark",
        bio: "I am a birth mother searching for my son who was adopted in 1993. I am of Black/African ethnicity and have always hoped to reconnect with him. I want him to know that he has always been in my heart and that I am here, ready to welcome him back into my life.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Black/African", adoptionYear: "1993" } },
      },
      {
        img: "https://randomuser.me/api/portraits/women/57.jpg",
        user_id: userMap["linda_b@example.com"],
        username: "linda_baker94",
        full_name: "Linda Baker",
        bio: "I was adopted in 1994 and am of Caucasian descent. I’ve always been curious about my birth family and hope to find them to learn more about my heritage and the story behind my adoption. Connecting with them would mean everything to me.",
        settings: {},
        account_type: "adoptee",
        data: { raw: { ethnicity: "Caucasian", adoptionYear: "1994" } },
      },
      {
        img: "https://randomuser.me/api/portraits/men/57.jpg",
        user_id: userMap["thomas@example.com"],
        username: "thomas_davis",
        full_name: "Thomas Davis",
        bio: "I am a birth father searching for my daughter who was adopted in 1994. I am of Caucasian ethnicity and have always hoped to reconnect with her. I want to share our family’s traditions and stories with her and let her know she has always been loved and missed.",
        settings: {},
        account_type: "nonAdoptee",
        data: { raw: { ethnicity: "Caucasian", adoptionYear: "1994" } },
      },
      // Add more profiles here up to 100, ensuring unique usernames, different surnames for matched profiles, and varied ethnicities
    ]

    for (const profile of profiles) {
      await Profile.create(profile)
    }

    const seedingProfiles = await knex("profiles").select("*")
    console.log(seedingProfiles)
    const posts = [
      {
        profile_id: seedingProfiles[0].id,
        title: "My Adoption Journey",
        body: `[{"id":"1","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I have always wondered about my birth family...","styles":{}}],"children":[]}]`,
        img: "https://images.pexels.com/photos/847489/pexels-photo-847489.jpeg",
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[1].id,
        title: "Searching for My Son",
        body: `[{"id":"2","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I am looking for my son who was adopted...","styles":{}}],"children":[]}]`,
        img: "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg",
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[2].id,
        title: "Finding My Roots",
        body: `[{"id":"3","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"As an adoptee, I have always felt a part of me was missing...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[3].id,
        title: "A Mother's Hope",
        body: `[{"id":"4","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I placed my daughter for adoption years ago...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[4].id,
        title: "Cultural Connections",
        body: `[{"id":"5","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I want to learn more about my Asian heritage...","styles":{}}],"children":[]}]`,
        img: "https://images.pexels.com/photos/920209/pexels-photo-920209.jpeg",
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[5].id,
        title: "Reunion Dreams",
        body: `[{"id":"6","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I dream of reuniting with my birth family someday...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[6].id,
        title: "Family and Heritage",
        body: `[{"id":"7","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Learning about my heritage has always been important to me...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[7].id,
        title: "Longing for Reunion",
        body: `[{"id":"8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Every day I think about the possibility of reuniting with my birth parents...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[8].id,
        title: "Connecting with My Culture",
        body: `[{"id":"9","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I have always felt a strong connection to my cultural heritage...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[9].id,
        title: "Hopes and Dreams",
        body: `[{"id":"10","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I hope to one day meet my birth family and learn about their lives...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[10].id,
        title: "Finding My Place",
        body: `[{"id":"11","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"As an adoptee, finding my place in the world has been a journey...","styles":{}}],"children":[]}]`,
        img: "https://images.pexels.com/photos/1235453/pexels-photo-1235453.jpeg",
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[11].id,
        title: "A Parent's Love",
        body: `[{"id":"12","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I have always loved my child and hope to one day reunite with them...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[12].id,
        title: "Tracing My Ancestry",
        body: `[{"id":"13","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I have spent years tracing my ancestry in hopes of finding my birth family...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[13].id,
        title: "Discovering My Past",
        body: `[{"id":"14","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Learning about my past has been a long and emotional journey...","styles":{}}],"children":[]}]`,
        img: "https://images.pexels.com/photos/1237118/pexels-photo-1237118.jpeg",
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[14].id,
        title: "The Search for Family",
        body: `[{"id":"15","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"I have always been searching for my birth family...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[15].id,
        title: "Finding Connection",
        body: `[{"id":"16","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Connecting with my birth family has always been a dream of mine...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[16].id,
        title: "Family Ties",
        body: `[{"id":"17","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"The ties of family are strong, even through adoption...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[17].id,
        title: "Heritage and History",
        body: `[{"id":"18","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Understanding my heritage has been key to understanding myself...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[18].id,
        title: "A Journey of Discovery",
        body: `[{"id":"19","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Learning about my adoption story has been a journey of discovery...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
      {
        profile_id: seedingProfiles[19].id,
        title: "Finding Peace",
        body: `[{"id":"20","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Finding peace with my adoption story has been challenging but rewarding...","styles":{}}],"children":[]}]`,
        created_at: new Date(),
      },
    ]

    for (const post of posts) {
      await Post.create(post)
    }
    const { chatroom: chatRoom1 } = await Chatrooms.createChatRoom(
      seedingProfiles[0].id,
      seedingProfiles[1].id
    )

    await Chatrooms.addMessage(
      chatRoom1.id,
      seedingProfiles[0].id,
      `{"8c04e81a-d751-4b4c-9ea8-af853a31bb01":{"id":"8c04e81a-d751-4b4c-9ea8-af853a31bb01","type":"NumberedList","meta":{"order":0,"depth":0},"value":[{"id":"f87bd950-060e-49cb-b5ea-c9924c54c8c1","type":"numbered-list","children":[{"text":"testing message n stuff "}],"props":{"nodeType":"block"}}]},"597fb6f2-a802-45c4-a3ae-ce5a8fc9e079":{"id":"597fb6f2-a802-45c4-a3ae-ce5a8fc9e079","value":[{"id":"46d5fa4e-ec9e-4ad8-a627-974dc2793aac","type":"numbered-list","children":[{"text":"yessir ","strike":true}],"props":{"nodeType":"block"}}],"type":"NumberedList","meta":{"order":1,"depth":0}},"1fb05d1f-197e-4ffa-bcc7-28f446605caa":{"id":"1fb05d1f-197e-4ffa-bcc7-28f446605caa","value":[{"id":"996ab609-1095-4ba2-b15a-828e687ab436","type":"numbered-list","children":[{"text":"trueeeee"},{"text":"eeeeee","bold":true}],"props":{"nodeType":"block"}}],"type":"NumberedList","meta":{"order":2,"depth":0}},"e642c019-6734-46e7-8bdb-13af2aaeebc6":{"id":"e642c019-6734-46e7-8bdb-13af2aaeebc6","type":"Blockquote","meta":{"order":3,"depth":0},"value":[{"id":"e80a2940-db9d-446c-ba38-28b6b1184069","type":"blockquote","children":[{"text":"damn"}],"props":{"nodeType":"block"}}]}}`
    )
    const comments = [
      {
        profile_id: seedingProfiles[0].id,
        post_id: 1,
        body: "This is the first comment.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        profile_id: seedingProfiles[1].id,
        post_id: 1,
        body: "This is another comment.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        profile_id: seedingProfiles[2].id,
        post_id: 1,
        comment_id: 1,
        body: "This is a reply to the first comment.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
    for (const comment of comments) {
      await Comment.create(comment)
    }
  } catch (error) {
    console.error("Error during seeding:", error)
  }
}
