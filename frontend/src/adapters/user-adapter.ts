// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { User } from "../contexts/current-user-context";
import { fetchHandler, getPostOptions, getPatchOptions, fetchCommentLikes } from "../utils";
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
  homeTown: {lat: number, lon: number};
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
  try {
    const imgUrl = await uploadFileAndGetURL(img);
    const [responseData, error] = await fetchHandler('/api/profiles', getPostOptions({user_id, username, bio, img: imgUrl, data: {raw: {adoptionYear, ethnicity}}, account_type: status, full_name: `${firstName} ${lastName}`}))
    const [similarProfiles, error2] = await fetchHandler('/api/similar', getPostOptions({id: responseData.id, adoption_year: adoptionYear, ethnicity, bio, }))
    if (error || error2) {
      console.error('Error creating profile:', error, error2);
      return;
    }
    return {...responseData, similarProfiles}
  }
  catch(error) {
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


const saveHomeTown = async ({profile_id, lat, lon}) => {
   const res = await fetch('/api/location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({profile_id, lat, lon}),
   });
   const json = await res.json();
    return json;
}

export const createUserWithProfile = async (formData:  SignUpFormData) => {
  try {
    const { email, password, firstName, lastName, username, status, img, bio, adoptionYear, ethnicity, homeTown } = formData;
    const user = await createUser({ email, password });
    const userId = user[0].id;
    const profile = await createProfile({ user_id: userId, firstName, lastName, username, status, img, bio, adoptionYear, ethnicity });
    const home = await saveHomeTown({profile_id: userId, lat: homeTown.lat, lon: homeTown.lon});
    console.log(home, 'ewjsm')
    return { user, profile };

  } catch (error) {
    console.error('Error creating user with profile:', error);
    return { user: null, profile: null };
  }
}