import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().required("required").email("Not a valid email adress"),
  password: yup.string().required("required"),
});
