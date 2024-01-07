import * as yup from "yup";

export const AddCompanyUser = yup.object().shape({
    firstName: yup.string().required("First Name need to be required"),
    lastName: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
    email: yup.string().required("required").email("Not a valid email adress"),
    password: yup.string().required("required"),
    role: yup.string().required("required"),
});

export const UpdateCompanyUser = yup.object().shape({
    firstName: yup.string().required("First Name need to be required"),
    lastName: yup.string().required("required"),
    email: yup.string().required("required").email("Not a valid email adress"),
    phoneNumber: yup.string().required("required"),
});
