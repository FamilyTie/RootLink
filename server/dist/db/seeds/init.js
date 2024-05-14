exports.seed = async (knex) => {
<<<<<<< HEAD
    await knex("comments").del();
    await knex("posts").del();
    await knex("profiles").del();
    await knex("users").del();
    // Reset sequences
    await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    await knex.raw("ALTER SEQUENCE profiles_id_seq RESTART WITH 1");
    await knex.raw("ALTER SEQUENCE posts_id_seq RESTART WITH 1");
    await knex.raw("ALTER SEQUENCE comments_id_seq RESTART WITH 1");
    // Insert users
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
    // Insert profiles
    const profiles = await knex("profiles")
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
    // Insert posts
    const posts = await knex("posts")
        .insert([
        {
            user_id: 1,
            profile_id: 1,
            title: "Looking for my sister",
            body: `[{"id":"67856187-b18c-4cbd-8d7b-b7ffaffdd3a6","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"im so lonely ","styles":{}}],"children":[]},{"id":"391e063f-893d-4676-9588-892b2aab1128","type":"table","props":{"textColor":"default","backgroundColor":"default"},"content":{"type":"tableContent","rows":[{"cells":[[{"type":"text","text":"my table","styles":{}}],[],[]]},{"cells":[[],[],[]]}]},"children":[]},{"id":"9f40bb6a-18e2-4993-bbce-890c27ff234f","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"yep","styles":{}}],"children":[]}]`,
            created_at: new Date(),
        },
        {
            user_id: 1,
            profile_id: 1,
            title: "Another post",
            body: `[{"id":"dfbd3e9f-b8fa-48bd-87ea-d0ac410158bb","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"post 2 ","styles":{}}],"children":[]},{"id":"c93178a8-71b5-4460-b761-3348b0353290","type":"alert","props":{"textColor":"default","textAlignment":"left","type":"success"},"content":[{"type":"text","text":"type cool","styles":{}}],"children":[]},{"id":"15687efa-ba8f-46ac-8a33-0c02e6c19447","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"!!!","styles":{"textColor":"red"}}],"children":[]}]`,
            created_at: new Date(),
        },
    ])
        .returning("id");
    // Insert comments
    await knex("comments").insert([
        {
            post_id: 1,
            profile_id: 1,
            body: "This is a comment.",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
    // Insert reply comments
    await knex("comments").insert([
        {
            post_id: 1,
            comment_id: 1,
            profile_id: 1,
            body: "This is a reply to the first comment.",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
=======
    await knex('users').del();
    await knex('posts').del();
    await knex('profiles').del();
    await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE profiles_id_seq RESTART WITH 1');
    // await knex('users').insert([
    //   { username: 'kelvin_melvin', password_hash: '123', email: 'kev@gmail.com', role: 'adoptee', created_at: new Date() },
    //   { username: 'maya', password_hash: '123', email: 'maya@gmail.com', role: 'family', created_at: new Date() },
    //   { username: 'tyrone', password_hash: '123', email: 'tyty@gmail.com', role: 'both', created_at: new Date() }
    // ]);
    // const profileInserts = await knex('profiles').insert([
    //   { user_id: 1, username: 'profile_kelvin', fullName: 'Kelvin Melvin', accountType: 'adoptee', data: 'Profile Data', created_at: new Date() },
    //   { user_id: 2, username: 'profile_maya', fullName: 'Maya Example', accountType: 'family', data: 'Profile Data', created_at: new Date() },
    // ]).returning('id');
    // const profiles = profileInserts.map(p => p.id)
    // await knex('posts').insert([
    //   { user_id: 1, profile_id: profiles[0], title: "Looking for my sister", body: "Hello, I have a sister that was adopted 15 years ago from Brooklyn New York", created_at: new Date() },
    //   { user_id: 2, profile_id: profiles[1], title: "Looking for my brother", body: "Hello, I have a brother that was adopted 5 years ago from Jacksonville, Florida", created_at: new Date() }
    // ]);
>>>>>>> 56532abd33698a02e646822f3d68533dfc070ffa
};
