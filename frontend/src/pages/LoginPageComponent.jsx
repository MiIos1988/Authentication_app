import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import GoogleButtonComponent from "../components/GoogleButtonComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginData } from "../service/authService";
import validator from "validator";

const LoginPageComponent = () => {
  const { t } = useTranslation();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(loginUser.email)) {
      return toast.error("Invalid email!");
    }
    if (loginUser.password.length < 6) {
      return toast.error("Invalid password!");
    }
    try {
      const dataLogin = await loginData(loginUser);

      navigate("/");
      setLoginUser({
        email: "",
        password: "",
      });
    } catch (err) {
      if (err.response && err.response.status === 420) {
        toast.error("Email not register!");
      } else if (err.response && err.response.status === 421) {
        toast.error("Password is not valid!");
      } else if (err.response && err.response.status === 422) {
        toast.error("Admin mast activate your account!");
      } else {
        console.log(err.response.status)
        toast.error("Login error!");
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className=" sm:mx-11 mx-2 2xl:mx-48 mt-16">
        <form
          action=""
          className="flex flex-col w-[95%] sm:w-[420px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl"
        >
          <FaUserTie className="text-[8rem] text-white m-auto pb-5" />
          <div className="relative">
            <input
              type="email"
              placeholder={t("register.email")}
              value={loginUser.email}
              onChange={(e) =>
                setLoginUser({ ...loginUser, email: e.target.value })
              }
              className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
            />
            <FaUserAlt className="absolute top-[10px] left-2 text-2xl text-blue-900" />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="*************"
              value={loginUser.password}
              onChange={(e) =>
                setLoginUser({ ...loginUser, password: e.target.value })
              }
              className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
            />
            <FaUnlock className="absolute top-[10px] left-2 text-2xl text-blue-900" />
          </div>
          <div className="flex justify-between">
            <div>
              <input type="checkbox" />
              <span className="ml-1 text-white ">{t("login.rememberMe")}</span>
            </div>
            <span className="text-white">{t("login.forgotPassword")}</span>
          </div>
          <button
            className="text-white bg-blue-700 mt-5 text-xl p-2 uppercase"
            onClick={handleLoginSubmit}
          >
            {t("login")}{" "}
          </button>
          <GoogleButtonComponent />
        </form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default LoginPageComponent;
