import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  firstName: yup.string().required("First Name need to be required"),
  lastName: yup.string().required("required"),
  companyName: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
  email: yup.string().required("required").email("Not a valid email adress"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
