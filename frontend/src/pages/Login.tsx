import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UserCredentials, logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext, { User } from "../contexts/current-user-context";

export default function LoginPage(refresh) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  if (currentUser) return <Navigate to="/feed" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = Object.fromEntries(new FormData(event.target));
    const [user, error] = await logUserIn(formData as any as UserCredentials);
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    
 
    window.location.reload()

  };

  

  return (
    <>
      <div className="overflow-hidden  h-screen relative">
        <div className="absolute w-full flex align-center font-semibold text-[30px] p-10 px-[6rem] z-[20]">
          <p>RootLink</p>
          <img
            className="w-[26.15px] h-[32.33px] self-center"
            src="/tree2.png"
          ></img>
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
        <div className="absolute bg-gradient-to-b z-[3] from-[#A0D9FF] to-white h-full w-screen opacity-[85%]"></div>

        {/* Form Layer */}
        <form
          className="absolute z-[4] scale-[1.1] bg-white inset-0 mx-[66.42%] mt-[200px] w-[337px] h-[435px] rounded-[1px]"
          onSubmit={handleSubmit}
          aria-labelledby="login-heading"
        >
          <h2
            id="login-heading"
            className="font-400 text-[36px] m-auto text-center pt-10"
          >
            Welcome back!
          </h2>

          <label
            htmlFor="username"
            className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500"
          >
            Email-Adress:
          </label>
          <input
            type="text"
            className="border bg-[#ceeafd20] border-[#0A69AE] m-auto rounded-sm w-[210px]"
            autoComplete="email"
            id="email"
            name="email"
          />

          <label
            htmlFor="password"
            className="text-[18px] pt-[8px] ml-[63px] m-auto font-500"
          >
            Password
          </label>
          <input
            type="password"
            className="border bg-[#ceeafd20] border-[#0A69AE] m-auto rounded-sm w-[210px]"
            autoComplete="current-password"
            id="password"
            name="password"
          />

          <button
            type="submit"
            className="w-[102px] h-[33px] ml-[35%] mt-[43px] bg-[#042B48] text-white"
          >
            Log-In
          </button>
          <p className="text-center pt-5">
            Don't have an account? <span className="underline"><a href='/sign-up'>Sign up</a></span>
          </p>
        </form>
        <p className="z-[5] absolute left-[27%] bottom-[3.5rem] text-[32px] font-medium">
          Rediscover Your Roots: Connecting Hearts, Uniting Families{" "}
        </p>
      </div>

      {!!errorText && <p>{errorText}</p>}
    </>
  );
}

/* Rectangle 4 */
