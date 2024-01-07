import * as yup from "yup";

export const CompanySchema = yup.object().shape({
  CompanyName: yup.string().required("company name is required"),
  tax: yup.string().required("tax is required"),
  email: yup.string().required("required").email("Not a valid email adress"),
  firstname: yup.string().required("first name is required"),
  lastname: yup.string().required("last name is required"),
  location: yup.string().required("company name is required"),
  postalcode: yup.string().required("required"),
  country: yup.string().required("country is required"),
});

