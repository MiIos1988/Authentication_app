import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userData } from "../service/authService";
import {  useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const RegisterPageComponent = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse.access_token)
      const decoded = jwt_decode(tokenResponse.access_token);
      console.log(decoded)
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const fillRegisterInput = (e) => {
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };
  const registerValidationSchema = yup.object({
    firstName: yup.string().required("First Name is a required field!"),
    lastName: yup.string().required("Last Name is a required field!"),
    email: yup
      .string()
      .email("Invalid Email!")
      .required("Email is a required field!"),
    password: yup
      .string()
      .required()
      .min(6, "Password must contain at least 6 characters!"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is a required field!")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerValidationSchema.validate(registerInput, {
        abortEarly: false,
      });
      console.log("ok");
      const dataUser = await userData(registerInput);
      console.log(dataUser);
      setRegisterInput({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("Registration success!");
      toast.info("Admin mast check your registration");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (err.response && err.response.status === 411) {
        toast.error("Bad credentials!");
      } else if (err.response && err.response.status === 412) {
        toast.error("Email exist");
      } else if (err.response && err.response.status === 413) {
        toast.error("Registration error!");
      } else {
        err.inner[0].errors[0]
          ? toast.error(err.inner[0].errors[0])
          : toast.error("Error");
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className=" sm:mx-11 mx-2 2xl:mx-48 mt-8">
        <form
          action=""
          className="flex flex-col w-[95%] sm:w-[420px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl"
        >
          <h1 className="text-white text-3xl uppercase m-auto pb-8">
            {t("register")}
          </h1>
          <div className="relative">
            <input
              value={registerInput.firstName}
              type="text"
              placeholder={t("register.firstName")}
              name="firstName"
              onChange={fillRegisterInput}
              className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
            />
            <FaUserAlt className="absolute top-[10px] left-2 text-2xl text-blue-900" />
          </div>
          <div className="relative">
            <input
              value={registerInput.lastName}
              type="text"
              placeholder={t("register.lastName")}
              name="lastName"
              onChange={fillRegisterInput}
              className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
            />
            <FaUserAlt className="absolute top-[10px] left-2 text-2xl text-blue-900" />
          </div>
          <div className="relative">
            <input
              value={registerInput.email}
              type="email"
              placeholder={t("register.email")}
              name="email"
              onChange={fillRegisterInput}
              className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
            />
            <MdMail className="absolute top-[10px] left-2 text-2xl text-blue-900" />
          </div>
          <div className="relative">
            <input
              value={registerInput.password}
              type="password"
              placeholder={t("register.password")}
              name="password"
              onChange={fillRegisterInput}
              className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
            />
            <FaUnlock className="absolute top-[10px] left-2 text-2xl text-blue-900" />
          </div>
          <div className="relative">
            <input
              value={registerInput.confirmPassword}
              type="password"
              placeholder={t("register.confirmPassword")}
              name="confirmPassword"
              onChange={fillRegisterInput}
              className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
            />
            <FaUnlock className="absolute top-[10px] left-2 text-2xl text-blue-900" />
          </div>

          <button
            className="text-white bg-blue-700 mt-5 text-xl p-2 uppercase"
            onClick={handleSubmit}
          >
            {t("register")}
          </button>
        <button onClick={(e) =>{
          e.preventDefault();
          login()
        } }>Google</button>
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

export default RegisterPageComponent;
