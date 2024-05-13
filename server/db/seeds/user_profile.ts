import { Knex } from "knex";
import User from "../models/User";
import Profile from "../models/Profile";
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("profiles").del()

    // Inserts seed entries

    await User.create({
        email: "user1@gmail.com",
        password: "hashed_password1"
    })
    await User.create({
        email: "user2@gmail.com",
        password: "hashed_password2"})

    await Profile.create({
        user_id: 1,
        username: "user1",
        full_name: "User One",
        account_type: "regular",
        bio: "I am user"
    })
    await Profile.create({
        user_id: 2,
        username: "user2",
        full_name: "User Two",
        account_type: "",
        bio: "I am user"
    })

};
