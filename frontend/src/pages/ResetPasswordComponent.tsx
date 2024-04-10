import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import { resetPassword } from "../service/authService";

const ResetPasswordComponent = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const handleResetPassword = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      return toast.error("Invalid email!");
    }
    try {
      setEmail("");
      const reset = await resetPassword({ email });
      setSendEmail(true);
      toast.warning(reset.data.message);
    } catch (err) {
      console.log(err)
      toast.error("Error when resetting the password!");
    }
  };

  return (
    <div className="container mx-auto">
      <div className=" sm:mx-11 mx-2 2xl:mx-48 mt-16">
        {sendEmail ? (
          <p className="flex flex-col w-[95%] sm:w-[420px] mx-auto align-center text-white text-xl shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl">
            The email has been sent. Please check your email and follow the instructions to reset your password.
          </p>
        ) : (
          <form
            action=""
            className="flex flex-col w-[95%] sm:w-[420px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl"
          >
            <FaUserTie className="text-[8rem] text-white m-auto pb-5" />
            <div className="relative">
              <input
                type="email"
                placeholder={t("register.email")}
                className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <FaUserAlt className="absolute top-[10px] left-2 text-2xl text-blue-900" />
            </div>
            <button
              className="text-white bg-blue-700 mt-5 text-xl p-2 uppercase"
              onClick={(e) => 
                (e)}
            >
              Reset password
            </button>
          </form>
        )}
        <ToastContainer
          position="top-right"
          autoClose={4000}
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

export default ResetPasswordComponent;
