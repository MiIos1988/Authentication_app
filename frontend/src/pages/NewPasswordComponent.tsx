import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { checkToken, newPassword } from '../service/authService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { AxiosError } from 'axios';

const NewPasswordComponent = () => {
    const [loading, setLoading] = useState(true);
    const { token } = useParams();
    const [msg, setMsg] = useState("Token verification in progress...");
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
      const tokenExist = async() => {
        try{
          if(token){
            await checkToken({token})
            setLoading(false)
          }
          
        }catch(err){
          setMsg(err instanceof AxiosError && err.response?.data.message)
        }
      }

      tokenExist()
    },[]
    )

    const handleNewPassword = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
     if(password.length < 6 ){
     return toast.error("Password must not be less than 6 characters!")
     }else if(password !== repeatPassword){
      return toast.error("Password does not match!")
     }
     setPassword("");
     setRepeatPassword("");
     try{
      if(token){
        await newPassword({password, token: token})
        toast.success("You have successfully changed the password!");
      }
      setTimeout(() => {
        navigate("/login");
      }, 3000);
     }catch(err){
      toast.error("Error when replacing the password in the database!")
     }
    }

  return (
    <div>
      {
        loading ? <div className='text-xl text-white m-auto text-center'>{msg}</div> :
        <>
        <form
            action=""
            className="flex flex-col w-[95%] sm:w-[420px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl"
          >
            <FaUserTie className="text-[8rem] text-white m-auto pb-5" />
            <div className="relative">
              <input
                type="password"
                placeholder={"New password"}
                className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FaUserAlt className="absolute top-[10px] left-2 text-2xl text-blue-900" />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder={"Repeat password"}
                className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword}
              />
              <FaUserAlt className="absolute top-[10px] left-2 text-2xl text-blue-900" />
            </div>
            <button
              className="text-white bg-blue-700 mt-5 text-xl p-2 uppercase"
              onClick={(e) => handleNewPassword(e)}
            >
              Reset password
            </button>
          </form>
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
        </>
      }
    </div>
  )
}

export default NewPasswordComponent
