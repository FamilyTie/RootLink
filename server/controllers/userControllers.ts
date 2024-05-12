import { Response, Request } from 'express';
import { isAuthorized } from '../utils/auth-utils'
import User from '../db/models/User';

export interface UserReqBody {
  username?: string;
  password: string;
  email: string;
}
export const createUser = async (req: Request, res: Response) => {
  const { email, password }: UserReqBody = req.body;

  try {
    // Create the user
    const user = await User.create({
      email: email,
      password: password,
    });
    
    // Handle if user creation failed
    if (!user) {
      return res.sendStatus(409);
    }

    // Set userId in session
    (req.session as any).userId = user.id;

    // Send the created user in response
    res.send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.sendStatus(500);
  }
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await User.list();
  res.send(users);
};

export const showUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(Number(id));
  if (!user) return res.sendStatus(404);

  res.send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  const { id } = req.params;

  // Not only do users need to be logged in to update a user, they
  // need to be authorized to perform this action for this particular
  // user (users should only be able to change their own profiles)
  if (!isAuthorized(Number(id), req.session)) return res.sendStatus(403);

  const updatedUser = await User.update(Number(id), username);
  if (!updatedUser) return res.sendStatus(404)
  res.send(updatedUser);
};
// const newUser = createUser(bfaurelus@gmail.com,  '12345')

// console.log(newUser)
