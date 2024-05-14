
import { signUpValidation } from "./signUp";
import { createUser } from "../adapters/user-adapter";
import {useState, useEffect} from 'react';



function SignUpForm() {


  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cpassword = formData.get("cpassword") as string;
   if (password !== cpassword) {
    alert("Passwords do not match");

    return
   }

   const [user, error] = await createUser({ email, password });

  }


  

  return (
    <>
        <form
          className="absolute z-[4] bg-white inset-0 m-auto  h-[550px] w-[400px] rounded-[1px]"
          onSubmit={handleSubmit}
          aria-labelledby="signup-heading"
        >
          <h2 className="font-400 text-[36px] m-auto text-center pt-10" id="signup-heading">
            Sign Up
          </h2>
          <div className="flex flex-col items-start ml-6 mt-5">
            <label htmlFor="email" className="text-[18px] pt-[1.2rem] ml-[63px] m-auto font-500">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="border border-[#0A69AE] ml-[63px] rounded-sm w-[250px]"
              name="email"

              autoComplete="on"
            />
            <label htmlFor="password" className="text-[18px] pt-[1.2rem] ml-[63px] m-auto font-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-[#0A69AE] ml-[63px] rounded-sm w-[250px]"
              name="password"
              
              autoComplete="off"
              
            />
   
            <label htmlFor="cpassword" className="text-[18px] pt-[1.2rem] ml-[63px] m-auto font-500">
              Confirm password
            </label>
            <input
              type="password"
              id="cpassword"
              className="border border-[#0A69AE] ml-[63px]  rounded-sm w-[250px]"
              name="cpassword"
            
              autoComplete="off"
            
            />
            
            <button type="submit"
             className="w-[102px] scale-[1.2] h-[33px] ml-[35%] mt-[43px] bg-[#042B48] text-white" >
              Sign Up
            </button>
            <p className="text-center m-auto pt-5">
            Already have an account?
            <span className="underline">Log-in</span>
          </p>
          </div>
        </form>
    </>
  );
}


export default SignUpForm;
