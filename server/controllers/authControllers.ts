import User from "../db/models/User"
import Profile from "../db/models/Profile"
import { Request, Response } from "express"



export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body; // the req.body value is provided by the client
  console.log("Logging in user:", email, password)
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      console.log("User not found")
      return res.status(404).json({ message: "User not found" });
    }

    let profile = await Profile.findByUserId(user.id);
    if (!profile) {
      console.log("Profile not found")
      return res.status(404).json({ message: "Profile not found" });
    }

    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      console.log("Invalid password")
      return res.status(401).json({ message: "Invalid password" });
    }

    const similarProfiles = await Profile.getSimilarProfiles({ id: user.id, adoption_year: profile.data.raw.adoptionYear, ethnicity: profile.data.raw.ethnicity, bio: profile.bio });
    if (similarProfiles) profile = { ...profile, similarProfiles };

    (req as any).session.userId = user.id;

    res.send({ user, profile });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// This controller sets `req.session` to null, destroying the cookie
// which is the thing that keeps them logged in.
export const logoutUser = (req: Request, res: Response) => {
  req.session = null; // This clears the session

  for (const cookieName in req.cookies) {
    res.clearCookie(cookieName);

  }
  res.sendStatus(204);
}

// This controller returns 401 if the client is NOT logged in (doesn't have a cookie)
// or returns the user based on the userId stored on the client's cookie
export const showMe = async (req : Request, res: Response) => {
  if (!(req as any).session.userId) return res.sendStatus(401);
  
  const user = await User.findById((req as any).session.userId);
  if (!user) return res.status(404).send("User not found");

  let profile = await Profile.findByUserId((req as any).session.userId);
  if (!profile) return res.status(404).send("Profile not found");

  try {
    const similarProfiles = await Profile.getSimilarProfiles({
      id: profile.id,
      adoption_year: profile.data.raw.adoptionYear,
      ethnicity: profile.data.raw.ethnicity,
      bio: profile.bio,
    });
    profile = { ...profile, similarProfiles };
  } catch (error) {
    console.error("Error fetching similar profiles:", error);
    return res.status(500).send("Error fetching similar profiles");
  }

  res.send({ user, profile });
};
