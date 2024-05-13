
import { signUpValidation } from "./signUp";
import * as React from 'react';




interface FormValues {
  email: string;
  password: string;
  cpassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  cpassword?: string;
}

const initialValues: FormValues = {
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
        <form
          className="absolute z-[4] bg-white inset-0 mx-[66.42%] mt-[200px] w-[337px] rounded-[1px]"
          onSubmit={handleSubmit}
          aria-labelledby="signup-heading"
        >
          <h2 className="font-400 text-[36px] m-auto text-center pt-10" id="signup-heading">
            Sign Up
          </h2>
          <div className="flex flex-col items-start ml-6 mt-12">
            <label htmlFor="email" className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="border border-[#0A69AE] m-auto rounded-sm w-[210px]"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="on"
            />
            {errors.email && <small>{errors.email}</small>}
            <label htmlFor="password" className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-[#0A69AE] m-auto rounded-sm w-[210px]"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
              
            />
            {errors.password && <small>{errors.password}</small>}
            <label htmlFor="cpassword" className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500">
              Confirm password
            </label>
            <input
              type="password"
              id="cpassword"
              className="border border-[#0A69AE] m-auto rounded-sm w-[210px]"
              name="cpassword"
              value={values.cpassword}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            
            />
            {errors.cpassword && <small>{errors.cpassword}</small>}
            <button type="submit"
             className="w-[102px] h-[33px] ml-[35%] mt-[43px] bg-[#042B48] text-white" >
              Sign Up
            </button>
            <p className="text-center pt-5">
            Already have an aacount? {' '}
            <span className="underline">Log-in</span>
          </p>
          </div>
        </form>
    </>
  );
}

export default SignUpFormValidation;
