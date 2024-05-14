"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.showProfile = exports.listProfiles = exports.createProfile = void 0;
const Profile_1 = __importDefault(require("../db/models/Profile"));
const createProfile = async (req, res) => {
    const { user_id, img, username, full_name, bio, account_type, settings, data } = req.body;
    if (!user_id || !username || !full_name || !account_type) {
        return res.status(400).send("Required fields are missing.");
    }
    const profile = await Profile_1.default.create({
        user_id,
        username,
        full_name,
        bio,
        account_type,
        data,
        settings,
        img
    });
    if (!profile)
        return res
            .status(409)
            .send("Could not create profile, possibly due to a conflict.");
    console.log(profile);
    res.send(profile);
};
exports.createProfile = createProfile;
const listProfiles = async (req, res) => {
    const profiles = await Profile_1.default.list();
    res.send(profiles);
};
exports.listProfiles = listProfiles;
const showProfile = async (req, res) => {
    const { id } = req.params;
    const profile = await Profile_1.default.findById(Number(id));
    if (!profile)
        return res.sendStatus(404); // Not Found
    res.send(profile);
};
exports.showProfile = showProfile;
const updateProfile = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updatedProfile = await Profile_1.default.update(Number(id), data);
    if (!updatedProfile)
        return res.sendStatus(404);
    res.send(updatedProfile);
};
exports.updateProfile = updateProfile;
const deleteProfile = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Profile ID is required.");
    }
    try {
        const deletionResult = await Profile_1.default.delete(Number(id));
        if (!deletionResult) {
            return res.status(404).send("Profile not found or already deleted.");
        }
        res.sendStatus(204);
    }
    catch (error) {
        console.error("Failed to delete profile:", error);
        res.status(500).send("Error deleting profile.");
    }
};
exports.deleteProfile = deleteProfile;
