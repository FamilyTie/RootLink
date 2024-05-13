"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = async (knex) => {
    await knex("comments").del();
    await knex("posts").del();
    await knex("profiles").del();
    await knex("users").del();
    await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    await knex.raw("ALTER SEQUENCE posts_id_seq RESTART WITH 1");
    await knex.raw("ALTER SEQUENCE profiles_id_seq RESTART WITH 1");
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
    ]);
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
        .returning("id");
    const profiles = profileInserts.map((p) => p.id);
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
            profile_id: profiles[0],
            title: "can't figure out how ot limit editor heading size ",
            body: `[{"id":"d17d9da7-c623-4740-9f50-aaa422495416","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"sdfas","styles":{}}],"children":[]},{"id":"5744aa57-d886-4d73-8766-bb3a3be41679","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsdfs ","styles":{}}],"children":[]},{"id":"506c68b6-ffd4-4fb7-a132-b76de0b46820","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsfdsadfsafds","styles":{}}],"children":[]},{"id":"b19fc05c-e126-46f0-b71e-78611ed2452e","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"95fa2f3b-34e6-4e46-b2fb-7978559004fb","type":"alert","props":{"textColor":"default","textAlignment":"left","type":"error"},"content":[{"type":"text","text":"safsadsafdsfdfsdfsa","styles":{}}],"children":[]},{"id":"2e853508-9afd-44eb-a35b-af37c1357ec1","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"5bc9e4b9-3d5a-4745-b007-37f4835faa29","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"sfassdfsdfds","styles":{}}],"children":[]},{"id":"43c4a30d-a18a-4627-a59b-0ab3c826e0c1","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"2033a9e5-1ff7-4146-af10-1b788efad560","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"List Of ALl Commands","styles":{"bold":true}}],"children":[]},{"id":"dc924e89-98ac-4fbd-b4f3-2623d5ae2909","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"CMD SHIFT L","styles":{"bold":true}}],"children":[]},{"id":"904702eb-9a41-42af-bc87-40bef150ebac","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"SHIFT","styles":{"bold":true}}],"children":[]},{"id":"cfa766da-dfc1-443c-9c63-bedd04ef55e5","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"ALT T","styles":{"bold":true}}],"children":[]},{"id":"70e53730-05e5-4d38-8a7a-33a879f17a02","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"head test","styles":{}}],"children":[]},{"id":"65cd7fc8-e26f-4a7e-acbc-6796d99fd92a","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]`,
            created_at: new Date(),
        },
        {
            user_id: 1,
            profile_id: profiles[0],
            title: "testing 3",
            body: `[{"id":"d17d9da7-c623-4740-9f50-aaa422495416","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"sdfas","styles":{}}],"children":[]},{"id":"5744aa57-d886-4d73-8766-bb3a3be41679","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsdfs ","styles":{}}],"children":[]},{"id":"506c68b6-ffd4-4fb7-a132-b76de0b46820","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsfdsadfsafds","styles":{}}],"children":[]},{"id":"b19fc05c-e126-46f0-b71e-78611ed2452e","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"95fa2f3b-34e6-4e46-b2fb-7978559004fb","type":"alert","props":{"textColor":"default","textAlignment":"left","type":"error"},"content":[{"type":"text","text":"safsadsafdsfdfsdfsa","styles":{}}],"children":[]},{"id":"2e853508-9afd-44eb-a35b-af37c1357ec1","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"5bc9e4b9-3d5a-4745-b007-37f4835faa29","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"sfassdfsdfds","styles":{}}],"children":[]},{"id":"43c4a30d-a18a-4627-a59b-0ab3c826e0c1","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"2033a9e5-1ff7-4146-af10-1b788efad560","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"List Of ALl Commands","styles":{"bold":true}}],"children":[]},{"id":"dc924e89-98ac-4fbd-b4f3-2623d5ae2909","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"CMD SHIFT L","styles":{"bold":true}}],"children":[]},{"id":"904702eb-9a41-42af-bc87-40bef150ebac","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"SHIFT","styles":{"bold":true}}],"children":[]},{"id":"cfa766da-dfc1-443c-9c63-bedd04ef55e5","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"ALT T","styles":{"bold":true}}],"children":[]},{"id":"70e53730-05e5-4d38-8a7a-33a879f17a02","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"sdfassadfsadffd","styles":{}}],"children":[]},{"id":"65cd7fc8-e26f-4a7e-acbc-6796d99fd92a","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]`,
            created_at: new Date(),
        },
        {
            user_id: 1,
            profile_id: profiles[0],
            title: "testing 4",
            body: `[{"id":"b774c317-fb12-418f-a0f8-0723a784b598","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsafasfas","styles":{}}],"children":[]},{"id":"d51966a5-da9e-4784-b411-559daf842227","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"de9682e2-bfdb-41cd-8270-c1012759ebd8","type":"table","props":{"textColor":"default","backgroundColor":"default"},"content":{"type":"tableContent","rows":[{"cells":[[{"type":"text","text":"sfssff","styles":{}}],[{"type":"text","text":"sfsdfdf","styles":{}}],[{"type":"text","text":"safasfs","styles":{}}]]},{"cells":[[],[{"type":"text","text":"sffad","styles":{}}],[{"type":"text","text":"safasfssfd","styles":{}}]]}]},"children":[]},{"id":"28348f86-84cf-4db5-a6bd-c361fdaa3252","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"aa7eb0f8-775b-4ee5-9919-c2d9bef375e0","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"fsafsdafasdsdfdfs","styles":{}}],"children":[]},{"id":"4db65524-39eb-41c0-8531-6e481e351872","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"sfasfsdfsdsdfsdaf","styles":{}}],"children":[]},{"id":"6de00b45-ae15-4db4-86f9-034a579ef909","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"sdfafasdfasdf","styles":{}}],"children":[]},{"id":"425c0954-28d2-4553-b632-885e496ff31b","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]}]`,
            created_at: new Date(),
        },
    ]);
    await knex("comments").insert([
        {
            post_id: "1",
            comment_id: null,
            profile_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            body: "heyyy",
        },
        {
            post_id: "1",
            comment_id: null,
            profile_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            body: "seeding reply to heyy",
        },
    ]);
};
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
