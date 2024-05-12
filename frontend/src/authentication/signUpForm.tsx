import { useFormik } from "formik";
import { signUpValidation } from "./signUp";
import React from "react";

interface FormValues {
  name: string;
  age: string;
  username: string;
  email: string;
  password: string;
  cpassword: string;
}

interface FormErrors {
  name?: string;
  age?: string;
  username?: string;
  email?: string;
  password?: string;
  cpassword?: string;
}

const initialValues: FormValues = {
  name: "",
  age: "",
  username: "",
  email: "",
  password: "",
  cpassword: "",
};




function SignUpFormValidation() {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
  } = useFormik<FormValues>({
    initialValues: initialValues,
    validationSchema: signUpValidation,
    onSubmit: (values, actions) => {
      console.log(values);
      console.log(actions);
    },
  });

  return (
    <>
      <div className="signUpAuthentication">
        <form
          className="absolute z-[4] bg-white inset-0 mx-[66.42%] mt-[200px] w-[337px] rounded-[1px]"
          onSubmit={handleSubmit}
          aria-labelledby="signup-heading"
        >
          <h2 className="font-400 text-[36px] m-auto text-center pt-10" id="signup-heading">
            Sign Up
          </h2>
          <div className="flex flex-col items-start ml-6 mt-12">
            <label htmlFor="name" className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500">
              Name
            </label>
            <input
              type="text"
              className="border border-[#0A69AE] m-auto rounded-sm w-[210px]"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && <small>{errors.name}</small>}
            <label htmlFor="username" className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500">
              Username
            </label>
            <input
              type="text"
              className="border border-[#0A69AE] m-auto rounded-sm w-[210px]"
              name="username"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="username"
            />
            {errors.username && <small>{errors.username}</small>}
            <label htmlFor="email" className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500">
              Email
            </label>
            <input
              type="text"
              className="border border-[#0A69AE] m-auto rounded-sm w-[210px]"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <small>{errors.email}</small>}
            <label htmlFor="password" className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500">
              Password
            </label>
            <input
              type="password"
              className="border border-[#0A69AE] m-auto rounded-sm w-[210px]"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="password"
            />
            {errors.password && <small>{errors.password}</small>}
            <label htmlFor="cpassword" className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500">
              Confirm password
            </label>
            <input
              type="password"
              className="border border-[#0A69AE] m-auto rounded-sm w-[210px]"
              name="cpassword"
              value={values.cpassword}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="cpassword"
            />
            {errors.cpassword && <small>{errors.cpassword}</small>}
            <button className="w-[102px] h-[33px] ml-[35%] mt-[43px] bg-[#042B48] text-white" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpFormValidation;
