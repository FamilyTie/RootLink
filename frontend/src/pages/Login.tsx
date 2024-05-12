import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UserCredentials, logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext, { User } from "../contexts/current-user-context";
import { UserConfig } from "vite";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = Object.fromEntries(new FormData(event.target));
    const [user, error] = await logUserIn(formData as any as UserCredentials);
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <>
    
      <div className="overflow-hidden h-screen relative">
        <div className="absolute w-full flex align-center font-semibold text-[30px] p-10 px-[6rem] z-[20]" >
           <p>RootLink</p>
           <img  className='w-[26.15px] h-[32.33px] self-center' src='/tree2.png' ></img>
        </div>
        {/* White Background (Base Layer) */}
        <div className="absolute bg-white z-[1] w-screen h-screen"></div>
        
        {/* Image Layer */}
        <img
          className="absolute opacity-[20%]  z-[2]  w-[995px]"
          src="/image.png"
          alt="Background"
        />

        {/* Blue Gradient Layer */}
        <div
          className="absolute bg-gradient-to-b z-[3] from-[#A0D9FF] to-white h-full w-screen opacity-[85%]"
        ></div>

        {/* Form Layer */}
        <LoginPage />
        <p className="z-[5] absolute left-[27%] bottom-[3.5rem] text-[32px] font-medium">Rediscover Your Roots: Connecting Hearts, Uniting Families </p>
      </div>

      {!!errorText && <p>{errorText}</p>}
    
    </>
  );
}

/* Rectangle 4 */


