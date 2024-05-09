import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UserCredentials, logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext, { User } from "../contexts/current-user-context";
import { UserConfig } from "vite";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const formData = Object.fromEntries(new FormData(event.target));
    const [user, error] = await logUserIn(formData as any as UserCredentials);
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;


  return <>
    <form  className=' relative inset-0 mx-[66.42%]   w-[337px] h-[435px] rounded-[1px] ' onSubmit={handleSubmit} aria-labelledby="login-heading">
      <h2 id='login-heading ' className="font-400 text-[36px] m-auto text-center pt-10">Welcome back!</h2>
      
      <label htmlFor="username" className="text-[18px] pt-[3rem]  ml-[50px] m-auto font-500">Username:</label>
      <input type="text" className="border border-[#0A69AE] ml-[50px] rounded-sm w-[210px]" autoComplete="username" id="username" name="username" />

      <label htmlFor="password" className="text-[18px] pt-[8px]  ml-[50px] m-auto font-500">Password</label>
      <input type="password" className="border border-[#0A69AE]  ml-[50px] rounded-sm w-[210px]"  autoComplete="current-password" id="password" name="password" />
  
      <button  type='submit' className="w-[102px] h-[33px]    bg-[#042B48]   text-white ">Log-In</button>
    </form>
    { !!errorText && <p>{errorText}</p> }
  </>;
}


/* Rectangle 4 */

