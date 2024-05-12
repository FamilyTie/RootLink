"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.showUser = exports.listUsers = exports.createUser = void 0;
const auth_utils_1 = require("../utils/auth-utils");
const User_1 = __importDefault(require("../db/models/User"));
<<<<<<< HEAD
const isEmailInUse = async (email) => {
    const users = await User_1.default.list();
    for (const user of users) {
        if (user.email === email) {
            return true;
        }
    }
    return false;
};
const createUser = async (req, res) => {
    const { email, password, img } = req.body;
    try {
        const emailInUse = await isEmailInUse(email);
        if (emailInUse) {
            return res.status(409).send("Email already exists");
        }
        const user = await User_1.default.create({
            email,
            password_hash: password,
            img,
            created_at: new Date(),
            updated_at: new Date()
        });
        req.session.userId = user.id;
        res.send(user);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.sendStatus(409);
=======
const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Create the user
        const user = await User_1.default.create({
            email: email,
            password: password,
        });
        // Handle if user creation failed
        if (!user) {
            return res.sendStatus(409);
        }
        // Set userId in session
        req.session.userId = user.id;
        // Send the created user in response
        res.send(user);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.sendStatus(500);
>>>>>>> 12e28b12790531c2e450b501a7bc987fa348b4f7
    }
};
exports.createUser = createUser;
const listUsers = async (req, res) => {
    const users = await User_1.default.list();
    res.send(users);
};
exports.listUsers = listUsers;
const showUser = async (req, res) => {
    const { id } = req.params;
    const user = await User_1.default.findById(Number(id));
    if (!user)
        return res.sendStatus(404);
    res.send(user);
};
exports.showUser = showUser;
const updateUser = async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    if (!(0, auth_utils_1.isAuthorized)(Number(id), req.session))
        return res.sendStatus(403);
    const updatedUser = await User_1.default.update(Number(id), email);
    if (!updatedUser)
        return res.sendStatus(404);
    res.send(updatedUser);
};
exports.updateUser = updateUser;
<<<<<<< HEAD
const newUser = {
    email: 'b@mail.com',
    password: 'ssx',
    img: 'src/images'
};
console.log(newUser);
=======
// const newUser = createUser(bfaurelus@gmail.com,  '12345')
// console.log(newUser)
>>>>>>> 12e28b12790531c2e450b501a7bc987fa348b4f7
