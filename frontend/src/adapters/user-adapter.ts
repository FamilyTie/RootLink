// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { User } from "../contexts/current-user-context";
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";
import { UserCredentials } from "./auth-adapter";
import { uploadFileAndGetURL } from "../utils";
interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
  status: string;
  img: string;
  bio: string;
  adoptionYear: string;
  ethnicity: string;
}

interface ProfileData {
  user_id: number;
  firstName: string;
  lastName: string;
  username: string;
  status: string;
  img: string;
  bio: string;
  adoptionYear: string;
  ethnicity: string;

}
const baseUrl = '/api/users';

export const createUser = async ({ email, password }: UserCredentials) => (
  fetchHandler(baseUrl, getPostOptions({ email, password }))
);

export const createProfile = async ({ user_id ,firstName, lastName, username, status, img, bio, adoptionYear, ethnicity }: ProfileData) => {
  const imgUrl = await uploadFileAndGetURL(img);
  const [responseData, error] = await fetchHandler('/api/profiles', getPostOptions({user_id, username, bio, img: imgUrl, data: {raw: {adoptionYear, ethnicity}}, account_type: status, full_name: `${firstName} ${lastName}`}))
  if (error) {
    console.error('Error creating profile:', error);
    return;
  };
}
export const getAllUsers = async () => {
  const [users] = await fetchHandler(baseUrl);
  return users || [];
};
  



export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateUsername = async ({ id, username }: User) => (
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
);


export const createUserWithProfile = async (formData:  SignUpFormData) => {
  const { email, password, firstName, lastName, username, status, img, bio, adoptionYear, ethnicity } = formData;

  const user = await createUser({ email, password });
  console.log(user)
  const userId = user[0].id;
  const profile = await createProfile({ user_id: userId, firstName, lastName, username, status, img, bio, adoptionYear, ethnicity });
  
  return { user, profile };
}