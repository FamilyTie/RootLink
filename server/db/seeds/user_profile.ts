import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("profiles").del()

    // Inserts seed entries
    await knex("users").insert([
        { username: "user1", email: "user1@example.com", password_hash: "hashed_password1" },
        { username: "user2", email: "user2@example.com", password_hash: "hashed_password2" },
        { username: "user3", email: "user3@example.com", password_hash: "hashed_password3" }
    ]);
    await knex("profiles").insert([
        { user_id: 1, username: "user1", fullName: "User One",  accountType: "regular", img: "profile_image1.jpg", data: {} },
        { user_id: 2, username: "user2", fullName: "User Two", accountType: "regular", img: "profile_image2.jpg", data: {} },
        { user_id: 3, username: "user3", fullName: "User Three", accountType: "regular", img: "profile_image3.jpg", data: {} }
    ]);
};
