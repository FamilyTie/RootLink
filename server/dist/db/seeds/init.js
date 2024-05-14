exports.seed = async (knex) => {
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
};
