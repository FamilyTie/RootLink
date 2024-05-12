import * as yup from 'yup'
export const signUpValidation = yup.object({
    name: yup
    .string()
    .required("Required"),
    age: yup.number().required("Required"),
    username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup
    .string()
    .min(5, "Password must have at least 5 characters")
    .required("Required"),
    cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password not matched")
  .required("Required")
})
