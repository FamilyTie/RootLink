import { isAuthorized } from '../utils/auth-utils';
import { Response, Request } from 'express';
import User from '../db/models/User';

export interface UserReqBody {
<<<<<<< HEAD
  email: string;
  password: string;
  img: string;
  created_at: Date;
  updated_at: Date;
}

const isEmailInUse = async (email: string): Promise<boolean> => {
  const users = await User.list(); 

  for (const user of users) {
    if (user.email === email) {
      return true; 
    }
  }

  return false; 
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, img }: UserReqBody = req.body;

  try {
    const emailInUse = await isEmailInUse(email);

    if (emailInUse) {
      return res.status(409).send("Email already exists");
    }

    const user = await User.create({
      email,
      password_hash: password,
      img,
      created_at: new Date(),
      updated_at: new Date()
    });

    (req.session as any).userId = user.id;
    res.send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.sendStatus(409);
=======
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
>>>>>>> dc6f485a831311d9d52a9229046301cd176f7fc2
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
  const { email } = req.body;
  const { id } = req.params;

  if (!isAuthorized(Number(id), req.session)) return res.sendStatus(403);

  const updatedUser = await User.update(Number(id), email);
  if (!updatedUser) return res.sendStatus(404)
  res.send(updatedUser);
};
<<<<<<< HEAD

const newUser = {
  email: 'b@mail.com',
  password: 'ssx',
  img: 'src/images'
};

console.log(newUser)
=======
// const newUser = createUser(bfaurelus@gmail.com,  '12345')

// console.log(newUser)
>>>>>>> dc6f485a831311d9d52a9229046301cd176f7fc2
