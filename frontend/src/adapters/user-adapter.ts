// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { User } from "../contexts/current-user-context";
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";
import { UserCredentials } from "./auth-adapter";

const baseUrl = '/api/users';

export const createUser = async ({ username, password }: UserCredentials) => (
  fetchHandler(baseUrl, getPostOptions({ username, password }))
);

export const getAllUsers = async () => {
  const [users] = await fetchHandler(baseUrl);
  return users || [];
};

export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateUsername = async ({ id, username }: User) => (
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
);
