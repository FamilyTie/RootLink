const express = require("express")
import {
  createProfile,
  listProfiles,
  showProfile,
  updateProfile,
  deleteProfile,
  getProfileDataByUserId,
} from "../controllers/profilesController"

export const profileRouter = express.Router()

profileRouter.get("/:id", showProfile)
profileRouter.get("/", listProfiles)
profileRouter.post("/", createProfile)
profileRouter.patch("/:id", updateProfile)
profileRouter.delete("/:id", deleteProfile)
profileRouter.get("/user/:user_id", getProfileDataByUserId)
