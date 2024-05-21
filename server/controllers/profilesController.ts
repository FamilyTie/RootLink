import { Response, Request } from "express"
import Profile from "../db/models/Profile"
import { ProfileData } from "../db/models/Profile"

export interface ProfileReqBody {
  user_id: number
  img: string
  username: string
  full_name: string
  bio?: string
  account_type: string
  settings?: any
  data?: any
}

export const createProfile = async (req: Request, res: Response) => {
  const { user_id, img, username, full_name, bio, account_type, settings, data }: ProfileData = req.body

  if (!user_id || !username || !full_name || !account_type) {
    return res.status(400).send("Required fields are missing.")
  }

  const profile = await Profile.create({
    user_id,
    username,
    full_name,
    bio,
    account_type,
    data,
    settings,
    img
  })

  if (!profile)
    return res
      .status(409)
      .send("Could not create profile, possibly due to a conflict.")
  console.log(profile)
  res.send(profile)
}

export const listProfiles = async (req: Request, res: Response) => {
  const profiles = await Profile.list()
  res.send(profiles)
}

export const showProfile = async (req: Request, res: Response) => {
  const { id } = req.params
  const profile = await Profile.findById(Number(id))
  if (!profile) return res.sendStatus(404) // Not Found

  res.send(profile)
}

export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params
  const data: Partial<ProfileReqBody> = req.body

  const updatedProfile = await Profile.update(Number(id), data as ProfileData)
  if (!updatedProfile) return res.sendStatus(404)
  res.send(updatedProfile)
}
export const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send("Profile ID is required.")
  }

  try {
    const deletionResult = await Profile.delete(Number(id))
    if (!deletionResult) {
      return res.status(404).send("Profile not found or already deleted.")
    }

    res.sendStatus(204)
  } catch (error) {
    console.error("Failed to delete profile:", error)
    res.status(500).send("Error deleting profile.")
  }
}
