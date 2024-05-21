const express = require('express')
import { createProfile, listProfiles, showProfile, updateProfile, deleteProfile } from '../controllers/profilesController'

export const profileRouter = express.Router()

profileRouter.get('/:id', showProfile)
profileRouter.get('/', listProfiles)
profileRouter.post('/', createProfile)
profileRouter.patch('/:id', updateProfile)
profileRouter.delete('/:id', deleteProfile)

