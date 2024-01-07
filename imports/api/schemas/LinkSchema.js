import * as yup from "yup";

export const LinkSchema = yup.object().shape({
  url: yup
    .string()
    .required("is required")
    .url("Please enter a valid URL, including schema", {
      allowLocal: true,
    }),
});
