import { knex } from "../knex"
import Post from "../models/Post"
import User from "../models/User"
import Profile from "../models/Profile"

exports.seed = async (knex) => {
  await knex("users").del()
  await knex("posts").del()
  await knex("profiles").del()

  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1")
  await knex.raw("ALTER SEQUENCE posts_id_seq RESTART WITH 1")
  await knex.raw("ALTER SEQUENCE profiles_id_seq RESTART WITH 1")

  await knex("users").insert([
    {
      username: "kelvin_melvin",
      password_hash: "123",
      email: "kev@gmail.com",
      role: "adoptee",
      created_at: new Date(),
    },
    {
      username: "maya",
      password_hash: "123",
      email: "maya@gmail.com",
      role: "family",
      created_at: new Date(),
    },
    {
      username: "tyrone",
      password_hash: "123",
      email: "tyty@gmail.com",
      role: "both",
      created_at: new Date(),
    },
  ])

  const profileInserts = await knex("profiles")
    .insert([
      {
        user_id: 1,
        username: "profile_kelvin",
        fullName: "Kelvin Melvin",
        accountType: "adoptee",
        data: "Profile Data",
        created_at: new Date(),
      },
      {
        user_id: 2,
        username: "profile_maya",
        fullName: "Maya Example",
        accountType: "family",
        data: "Profile Data",
        created_at: new Date(),
      },
    ])
    .returning("id")

  const profiles = profileInserts.map((p) => p.id)

  await knex("posts").insert([
    {
      user_id: 1,
      profile_id: profiles[0],
      title: "Looking for my sister",
      body: `[{"id":"32b3a4a7-ffff-4b93-8214-2543f256fc4d","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"lol","styles":{}}],"children":[]},{"id":"176382fb-1411-4e22-8260-f429c54225b7","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsfasfasf","styles":{}}],"children":[]},{"id":"e96668f1-4064-49fb-8146-2ac7fad94312","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"asfasfsa","styles":{}}],"children":[]},{"id":"8c52bb97-e0bc-44b7-b410-a136a51483b8","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"ffsf","styles":{}}],"children":[]}]`,
      created_at: new Date(),
    },
    {
      user_id: 1,
      profile_id: profiles[0].id,
      title: "Lost Dog",
      body: JSON.stringify([
        {
          id: "bffa68f1-4064-49fb-8146-2ac7fad943ff",
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "My dog went missing yesterday evening near the park.",
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: "9f52bb97-e0bc-44b7-b410-a136a5148333",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "He is a large German Shepherd.",
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: "7c52bb97-e0bc-44b7-b410-a136a5148245",
          type: "bulletListItem",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Wearing a red collar with a bone-shaped tag.",
              styles: {},
            },
          ],
          children: [],
        },
      ]),
      created_at: new Date(),
    },
    {
      user_id: 1,
      profile_id: profiles[0],
      title: "Looking for my sister",
      body: `[{"id":"c4c9f136-f26a-4995-af2c-8a247f273168","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"one two three ","styles":{}}],"children":[]},{"id":"1d6d08dc-b08d-4819-9838-c2354882a179","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"sfasf","styles":{}}],"children":[]},{"id":"0884f182-cdc6-45c6-86ca-232451280ba4","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fafasf","styles":{}}],"children":[]},{"id":"5c8dbd89-a358-4629-8c45-23071a453a0e","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"sd","styles":{}}],"children":[]},{"id":"b3fc75e5-433f-4a4f-afcd-242e0cf50af0","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"afasfasfs","styles":{}}],"children":[]},{"id":"6fae46a4-ba74-4274-b70e-13cfdca9811b","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"fsassff","styles":{}}],"children":[]},{"id":"4569422c-bba5-4da9-be1a-f4ead8d6db43","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"fafsdaf","styles":{}}],"children":[]},{"id":"9de8db4e-ac90-4a60-a4a8-41388ad5e42b","type":"table","props":{"textColor":"default","backgroundColor":"default"},"content":{"type":"tableContent","rows":[{"cells":[[{"type":"text","text":"safdsf","styles":{}}],[],[{"type":"text","text":"eee","styles":{}}]]},{"cells":[[{"type":"text","text":"zzzzz","styles":{}}],[{"type":"text","text":"dddd","styles":{}}],[{"type":"text","text":"rrr","styles":{}}]]}]},"children":[]},{"id":"2a81676c-fecc-4816-85d2-6be908b0f191","type":"image","props":{"backgroundColor":"default","textAlignment":"left","url":"https://tmpfiles.org/dl/5794186/screenshot2024-05-10at3.56.00pm.png","caption":"","width":512},"children":[]}]`,
      created_at: new Date(),
    },
    {
      user_id: 1,
      profile_id: profiles[0],
      title: "my dad noooo",
      body: `[{"id":"76731f63-83c6-4984-87b3-ad8e0ba96dd3","type":"alert","props":{"textColor":"default","textAlignment":"left","type":"success"},"content":[{"type":"text","text":"łfound my dad aha aha so sad","styles":{}}],"children":[]},{"id":"26cec211-19cd-4614-b87b-0c262d3284ea","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"1","styles":{}}],"children":[]},{"id":"3d3fe95a-d91b-4162-b942-2db6e83c18ca","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"2","styles":{}}],"children":[]},{"id":"af651b48-826a-4e09-9503-65889d5f85cd","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"3","styles":{}}],"children":[]},{"id":"42b2d3ea-97b7-4997-bac5-82729032d611","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"4","styles":{}}],"children":[]},{"id":"1420fba4-64d0-417e-a4da-5d9b0d3544b4","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"5","styles":{}}],"children":[]}]`,
      created_at: new Date(),
    },
    {
      user_id: 1,
      profile_id: profiles[0],
      title: "testing fully",
      body: `[{"id":"4290ad69-4b70-4ece-af9f-86ec7fa05ad0","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"my story ","styles":{}}],"children":[]},{"id":"4d4ee669-564e-4754-9e4f-0afbd482c531","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"dsfasfaf","styles":{}}],"children":[]},{"id":"d3de777e-cb3f-466d-8ff0-399078db5f58","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"1","styles":{}}],"children":[]},{"id":"381a9e34-a969-4474-88e1-141d99bb846f","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"2","styles":{}}],"children":[]},{"id":"149a1ad0-445f-4dc2-89da-e4eabbbae683","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"3","styles":{}}],"children":[]},{"id":"f4db397b-aa3d-4d76-ad9e-0701b60be479","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"4","styles":{}}],"children":[]},{"id":"b1fa50c4-0ae0-4f13-966f-08ad0dcea7f0","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"56","styles":{}}],"children":[]},{"id":"cd5c7d05-4940-4950-ba6d-327765d32eb1","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"sfsfs","styles":{}}],"children":[]},{"id":"479b42f0-b15b-412b-b2f3-8b889df7aa17","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fs","styles":{}}],"children":[]},{"id":"8d3036a4-14a8-48eb-a6bc-83bfecd813ab","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"asf","styles":{}}],"children":[]},{"id":"fdcd3985-85e7-44ae-9de5-3c9416cd9eb2","type":"table","props":{"textColor":"default","backgroundColor":"default"},"content":{"type":"tableContent","rows":[{"cells":[[{"type":"text","text":"safsssf","styles":{}}],[],[{"type":"text","text":"sdfs","styles":{}}]]},{"cells":[[],[{"type":"text","text":"sfffds","styles":{}}],[]]}]},"children":[]},{"id":"202f935c-4265-46f0-abdf-6440e1227b6b","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"123cd720-0458-45f6-b4f2-38b33b301e04","type":"image","props":{"backgroundColor":"default","textAlignment":"left","url":"https://tmpfiles.org/dl/5800702/screenshot2024-05-10at3.56.00pm.png","caption":"","width":512},"children":[]},{"id":"3e47f620-4e22-4112-966b-ab87785e42c7","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"9b6c51ec-107d-44a1-a95d-8e98868027a8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"List Of ALl Commands","styles":{"bold":true}}],"children":[]}]`,
      created_at: new Date(),
    },
  ])
}

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.seed = async (knex) => {
//   // Before you have models you can always just do `await knex('table_name').del`
//   await knex('users').del();

//   await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

//   await User.create('cool_cat', '1234');
//   await User.create('l33t-guy', '1234');
//   await User.create('wowow', '1234');
// };
