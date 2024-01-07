import * as yup from "yup";

export const SupplierSchema = yup.object().shape({
  civility: yup.string().required("Civility is required"),
  country: yup.string().required("Country is required"),
  email: yup.string().required("Email is required").email("Not a valid email"),
  fullName: yup.string().required("Full Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  postalCode: yup.string().required("Postal Code is required"),
  region: yup.string().required("Region is required"),
  socialReason: yup.string().required("Social Reason is required"),
  uid: yup.string().required("Unique identifier is required"),
  website: yup.string(),
  email: yup.string().required("Email is required").email("Not a valid email"),
  fullName: yup.string().required("Full Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  region: yup.string().required("Region is required"),
});

export const UpdateSupplierrSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Not a valid email"),
  fullName: yup.string().required("Full Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  region: yup.string().required("Region is required"),
});
