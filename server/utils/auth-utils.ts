import { Session } from "express-session";

const bcrypt = require('bcrypt');

/** Take in a user password and return a hashed password, undefined if error
 * @param {string} password Plaintext password
 * @param {number} saltRounds How many salt rounds to use
 * @returns {Promise<string|undefined>} Hashed password
 */
export const hashPassword = async (password : string, saltRounds = 8) => bcrypt
  .hash(password, saltRounds)
  .catch((err : Error) => console.log(err.message));

/** Check if a given password matches a given hash, returns a bool, or undefined if error
 * @param {string} password Plaintext password
 * @param {string} hash Salted hash
 * @returns {Promise<true|false|undefined>} Bool of whether password matches hash
 */
export const ValidPassword = async (password: string, hash : string) => {
  try {
    console.log(password, hash)
    const isValid = await bcrypt.compare(String(password), String(hash))
    console.log(isValid)
    return isValid
  } catch (err) {
    console.error(err.message)
  }
}
  
export const isAuthorized = (userId : number, session: Session) => {
  
  if (!userId || !session || !(session as any).userId) return false; 
  return Number(userId) === Number((session as any).userId);
};

