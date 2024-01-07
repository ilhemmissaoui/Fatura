import * as yup from "yup";

export const AddProductSchema = yup.object().shape({
  product: yup.string().required("insert your product"),
  category: yup.string().required("Category is required"),
  internalreference: yup.string().required("internal refernece is required"),
  manufacter: yup.string().required("manufacturer reference is required"),
  brand: yup.string().required("brand is required"),
  description: yup.string().required("Put a description"),
  tax: yup.string().required("tax is required"),
  vat: yup.string().required("vat is required"),
  brand: yup.string().required("brand is required"),
});

export const UpdateProductSchema = yup.object().shape({
  product: yup.string().required("insert your product"),
  category: yup.string().required("Category is required"),
  price: yup.string().required("brand is required"),
});
