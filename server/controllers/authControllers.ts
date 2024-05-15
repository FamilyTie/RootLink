import User from "../db/models/User"
import Profile from "../db/models/Profile"
// This controller takes the provided username and password and finds
// the matching user in the database. If the user is found and the password
// is valid, it adds the userId to the cookie (allowing them to stay logged in)
// and sends back the user object.
export const loginUser = async (req, res) => {
  const { email, password } = req.body // the req.body value is provided by the client

  const user = await User.findByEmail(email)
  if (!user) return res.sendStatus(404)

  const isPasswordValid = await user.isValidPassword(password)
  if (!isPasswordValid) return res.sendStatus(404)

  req.session.userId = user.id
  res.send(user)
}

// This controller sets `req.session` to null, destroying the cookie
// which is the thing that keeps them logged in.
export const logoutUser = (req, res) => {
  req.session = null; // This clears the session

    for (const cookieName in req.cookies) {
      res.clearCookie(cookieName);
      
    }
    res.sendStatus(204);
}

// This controller returns 401 if the client is NOT logged in (doesn't have a cookie)
// or returns the user based on the userId stored on the client's cookie
export const showMe = async (req, res) => {
  if (!req.session.userId) return res.sendStatus(401)

  const user = await User.findById(req.session.userId)
  const profile = await Profile.findById(req.session.userId)
  
  res.send({user, profile})
}
