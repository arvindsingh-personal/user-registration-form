import * as Yup from "yup";
const phoneRegexp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const panRegexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
export const userDetailsSchemaForStep1 = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your name"),
  mobile: Yup.string()
    .required("Please enter your mobile number")
    .matches(phoneRegexp, "Phone number is not valid")
    .min(10, "Too short")
    .max(10, "Too long"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .typeError("Enter Age in digits"),
  gender: Yup.string().min(2).max(25).required("Please select your gender"),
  idType: Yup.string().required("Please select your ID Type"),

  adhaarNumber: Yup?.string()
    ?.matches(/^[2-9]\d{11}$/, "Invalid Aadhar Number")
    ?.required("Adhaar is required")
    ?.typeError("Enter Adhaar Number in digits"),
  panNumber: Yup?.string()
    // .transform((value) => (isNaN(value) ? undefined : value))
    ?.required("Please enter your PAN Number")
    ?.matches(panRegexp, "PAN number is not valid")
    ?.min(10, "Enter 10 characters PAN Number")
    ?.max(12, "Enter 10 characters PAN Number"),
});
export const userDetailsSchemaForStep2 = Yup.object({
  zip: Yup.string()
    .min(6)
    .max(6)
    .notRequired()
    .matches(/^\d{6}$/, "PIN code must be exactly 6 digits"),
  //   country:Yup.string().required("Please select your country ")
});
