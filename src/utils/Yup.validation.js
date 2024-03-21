import * as Yup from "yup";

export const LoginValidation = Yup.object({
  email: Yup.string()
    .test("isValid", "Enter Valid Email", (val) => {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        return true;
      }
      return false;
    })
    .required("Email is Required!"),
  password: Yup.string().required("Password is Required!"),
});
