// // import User from '../models/User';
// import { Comment, CommentLike, UserLogin,  Post, PostLike, Profile, Chatroom, Message, Notifications} from './interface';
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
import { Comment, CommentLike, UserLogin,  Post, PostLike, Profile, Chatroom, Message, Notifications} from './interface';


exports.seed = async function(knex): Promise<void> {
  // Clear existing data from all tables
  await knex('users').del();
  await knex('profiles').del();
  await knex('posts').del();
  await knex('comments').del();


  await knex.raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1')
  await knex.raw('ALTER SEQUENCE profiles_id_seq RESTART WITH 1')
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1')
  await knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 1')

  // Insert seed data for users
  const users: UserLogin[] = [];
  for (let i = 1; i <= 50; i++) {
    const role = i % 3 === 0 ? 'both' : (i % 2 === 0 ? 'family' : 'adoptee');
    users.push({
      id: i,
      email: `user${i}@example.com`,
      role,
      hashed_password: `hashed_password_${i}`,
      created_at: new Date()
    });
  }
  await knex('users').insert(users);

  // Insert seed data for profiles
  const profiles: Profile[] = [];
  for (let i = 1; i <= 50; i++) {
    profiles.push({
      id: i,
      user_id: i,
      username: `user${i}`,
      full_name: `User ${i}`,
      bio: `Bio for User ${i}`,
      account_type: 'standard',
      data: { role: users[i - 1].role }
    });
  }
  await knex('profiles').insert(profiles);

  // Insert seed data for posts and comments
  const posts: Post[] = [];
  const comments: Comment[] = [];
  for (let i = 1; i <= 75; i++) {
    const profileId = i % 50 + 1; // Distribute profiles evenly
    const postId = i;
    posts.push({
      id: postId,
      title: `Post ${i}`,
      body: `Body for Post ${i}`,
      profile_id: profileId,
      created_at: new Date(),
      updated_at: new Date()
    });
    // Generate 2 comments for each post
    comments.push({
      id: i,
      post_id: postId,
      profile_id: profileId,
      body: `Comment 1 for Post ${i}`,
      created_at: new Date(),
      updated_at: new Date()
    });
    comments.push({
      id: i + 1,
      post_id: postId,
      profile_id: profileId,
      body: `Comment 2 for Post ${i}`,
      created_at: new Date(),
      updated_at: new Date()
    });
  }
  await knex('posts').insert(posts);
  await knex('comments').insert(comments);
};
