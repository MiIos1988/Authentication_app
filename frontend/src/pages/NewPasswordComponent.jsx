import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { checkToken } from '../service/authService';
import { ToastContainer, toast } from 'react-toastify';
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

const NewPasswordComponent = () => {
    const [loading, setLoading] = useState(true);
    const { token } = useParams();

    useEffect(() => {
      const tokenExist = async() => {
        try{
          await checkToken({token})
          setLoading(false)
          
        }catch(err){
          toast.error("Token not valid!");
        }
      }

      tokenExist()
    },[]
    )

    const handleNewPassword = (e) => {
      e.preventDefault();
    }

  return (
    <div>
      {
        loading ? <div className='text-xl text-white m-auto text-center'>Token verification in progress...</div> :
        <>
        <form
            action=""
            className="flex flex-col w-[95%] sm:w-[420px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl"
          >
            <FaUserTie className="text-[8rem] text-white m-auto pb-5" />
            <div className="relative">
              <input
                type="email"
                placeholder={"New password"}
                className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
              />
              <FaUserAlt className="absolute top-[10px] left-2 text-2xl text-blue-900" />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder={"Repeat password"}
                className="mb-3 p-2 pl-14 focus:outline-none w-full text-xl"
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
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
