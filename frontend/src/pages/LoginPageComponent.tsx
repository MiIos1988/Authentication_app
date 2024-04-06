import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import GoogleButtonComponent from "../components/GoogleButtonComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginData, setTokenInLocalStorage, userDataGoogleLogin } from "../service/authService";
import validator from "validator";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import { saveUser } from "../redux/userSlicer";
import { useDispatch } from "react-redux";
import { AxiosError } from 'axios';

type DataUser = {
  data: {
    token: string
  }
}

const LoginPageComponent = () => {
  const { t } = useTranslation();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getDataUser = (dataUser: DataUser) => {
    const decodedToken = jwt_decode(dataUser.data.token);
    setTokenInLocalStorage(dataUser.data.token)
    dispatch(saveUser(decodedToken));
  }

  const handleLoginSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!validator.isEmail(loginUser.email)) {
      return toast.error("Invalid email!");
    }
    if (loginUser.password.length < 6) {
      return toast.error("Invalid password!");
    }
    try {
      const dataLogin = await loginData(loginUser);
      getDataUser(dataLogin)
      navigate("/");
      setLoginUser({
        email: "",
        password: "",
      });
    } catch (err) {
      if (err instanceof AxiosError && err.response && err.response.status === 420) {
        toast.error("Email not register!");
      } else if (err instanceof AxiosError && err.response && err.response.status === 421) {
        toast.error("Password is not valid!");
      } else if (err instanceof AxiosError && err.response && err.response.status === 422) {
        toast.error("Admin mast activate your account!");
      } else {
        toast.error("Login error!");
      }
    }
  };

  const handleGoogleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleGoogleLogin();
  }
  
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const dataUserGoogle = await userDataGoogleLogin({
          token: tokenResponse.access_token,
        });
        getDataUser(dataUserGoogle)
        navigate("/");
      } catch (err) {
        if (err instanceof AxiosError && err.response && err.response.status === 413) {
          toast.error("Google login error!");
        } else if (err instanceof AxiosError && err.response && err.response.status === 422) {
          toast.error("Admin mast activate your account!");
        }
        else {
          toast.error("Login error!");
        }
      }
    },
  });

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
            
            <span className="text-white cursor-pointer" onClick={() => navigate("/reset-password")}>{t("login.forgotPassword")}</span>
          </div>
          <button
            className="text-white bg-blue-700 mt-5 text-xl p-2 uppercase"
            onClick={handleLoginSubmit}
          >
            {t("login")}{" "}
          </button>
          <GoogleButtonComponent onClick={handleGoogleButton} />
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
