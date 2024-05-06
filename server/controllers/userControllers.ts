import { Response, Request } from 'express';
import { isAuthorized } from '../utils/auth-utils'
import User from '../db/models/User';

export interface UserReqBody {
  username: string;
  password: string;
}
export const createUser = async (req: Request, res: Response) => {
  const { username, password }: UserReqBody = req.body;

  // TODO: check if username is taken, and if it is what should you return?
  const user = await User.create(username, password);
  if (!user) return res.sendStatus(409);
  (req.session as any).userId = user.id;
  res.send(user);
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await User.list();
  res.send(users);
};

export const showUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.find(Number(id));
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