// import { createTextSpanFromBounds } from "typescript";

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = (knex) => {
//   return knex.schema
//   .createTable('users', (table) => {
//     table.increments();
//     table.string('username').notNullable().unique();
//     table.string('password_hash').notNullable();
//     table.string('email').notNullable().unique();
//     table.string('role').notNullable().defaultTo('family');
//     table.timestamps(true, true);
//   })
//   .createTable('posts', (table) => {
//     table.increments();
//     table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
//     table.integer('profile_id').references('id').inTable('profiles')
//     table.string('title').notNullable();
//     table.text('body').notNullable();
//     table.timestamps(true, true);
//   })
//   .createTable('profiles', (table) => {
//     table.increments(); // PK
//     table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
//     table.string('username').notNullable().unique();
//     table.string('fullName').notNullable();
//     table.string('accountType').notNullable().defaultTo('family');
//     table.text('data').notNullable();
//     table.timestamps(true, true);
//   });
// }
exports.up = (knex) => {
  return knex.schema
    .createTable("users", (table) => {
      table.increments()
      table.string("username").notNullable().unique()
      table.string("password_hash").notNullable()
      table.string("email").notNullable().unique()
      table.string("role").notNullable().defaultTo("family")
      table.timestamps(true, true)
    })
    .createTable("profiles", (table) => {
      table.increments()
      table.integer("user_id").unsigned().notNullable()
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
      table.string("username").notNullable().unique()
      table.string("fullName").notNullable()
      table.string("accountType").notNullable().defaultTo("family")
      table.text("data").notNullable()
      table.timestamps(true, true)
    })
    .createTable("posts", (table) => {
      table.increments()
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
      table.integer("profile_id").unsigned()
      table
        .foreign("profile_id")
        .references("id")
        .inTable("profiles")
        .onDelete("SET NULL")
      table.string("title").notNullable()
      table.text("body").notNullable()
      table.timestamps(true, true)
    })
    .createTable("comments", (table) => {
      table.increments()
      table
        .integer("post_id")
        .unsigned()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
      table.integer("comment_id").unsigned().nullable()
      table
        .foreign("comment_id")
        .references("id")
        .inTable("comments")
        .onDelete("SET NULL")
      table
        .integer("profile_id")
        .unsigned()
        .references("id")
        .inTable("profiles")
        .onDelete("CASCADE")
      table.text("body").notNullable()
      table.timestamps(true, true)
    })
}

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("profiles")
    .dropTableIfExists("users")
}

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = (knex) => {
//   return knex.schema
//     .dropTableIfExists('profiles')  // Drop 'profiles' first due to foreign key references
//     .dropTableIfExists('posts')     // Then drop 'posts'
//     .dropTableIfExists('users');    // Finally, drop 'users'
// };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable("users", (table) => {
      table.increments()
      table.string("username").notNullable().unique()
      table.string("password_hash").notNullable()
      table.string("email").notNullable().unique()
      table.string("role").notNullable().defaultTo("family")
      table.timestamps(true, true)
    })
    .createTable("profiles", (table) => {
      table.increments() // PK
      table.integer("user_id").unsigned().notNullable()
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
      table.string("username").notNullable().unique()
      table.string("fullName").notNullable()
      table.string("accountType").notNullable().defaultTo("family")
      table.text("data").notNullable()
      table.timestamps(true, true)
    })
    .createTable("posts", (table) => {
      table.increments()
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
      table.integer("profile_id").unsigned()
      table
        .foreign("profile_id")
        .references("id")
        .inTable("profiles")
        .onDelete("SET NULL")
      table.string("title").notNullable()
      table.text("body").notNullable()
      table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists("posts") // Drop 'posts' first due to foreign key references
    .dropTableIfExists("profiles") // Then drop 'profiles'
    .dropTableIfExists("users") // Finally, drop 'users'
}
