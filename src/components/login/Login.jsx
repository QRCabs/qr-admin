import { useEffect } from "react";
import { getUserFromStore } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import { LoginValidation } from "../../utils/Yup.validation";
import { useDispatch, useSelector } from "react-redux";
import { LoginActionTypes } from "./Login.actionTypes";
import logo from "../../assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (getUserFromStore()?.token) {
      navigate("/dashboard");
    }
  }, []);

  const loginAdmin = (data) => {
    dispatch({
      type: LoginActionTypes.ADMIN_LOGIN,
      payload: data,
    });
  };

  useEffect(() => {
    if (user?.success) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className="flex justify-between bg-[url('https://images.pexels.com/photos/21314159/pexels-photo-21314159/free-photo-of-straight-street-in-city.jpeg')] bg-cover bg-bottom">
      <div></div>
      <div className="w-1/2 h-screen flex justify-center items-center">
        <div className="w-full bg-slate-300 rounded-xl shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <img src={logo} className="h-8 ml-[-8px]" />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in to your account</h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginValidation}
              onSubmit={(vals) => {
                loginAdmin(vals);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                /* and other goodies */
              }) => (
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                      placeholder="name@company.com"
                    />
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                    />
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage name="password" />
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div> */}
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className={`${
                      user?.loading ? "animate-pulse" : ""
                    } w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <a href="#" className="font-medium text-blue-600 hover:underline">
                      Sign up
                    </a>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
