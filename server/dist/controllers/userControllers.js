"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.showUser = exports.listUsers = exports.createUser = void 0;
const auth_utils_1 = require("../utils/auth-utils");
const User_1 = __importDefault(require("../db/models/User"));
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
    const { username } = req.body;
    const { id } = req.params;
    // Not only do users need to be logged in to update a user, they
    // need to be authorized to perform this action for this particular
    // user (users should only be able to change their own profiles)
    if (!(0, auth_utils_1.isAuthorized)(Number(id), req.session))
        return res.sendStatus(403);
    const updatedUser = await User_1.default.update(Number(id), username);
    if (!updatedUser)
        return res.sendStatus(404);
    res.send(updatedUser);
};
exports.updateUser = updateUser;
