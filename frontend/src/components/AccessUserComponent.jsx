import React, { useState } from 'react'
import { useEffect } from "react";
import { getAllUser } from '../service/userService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AccessUserComponent = () => {
  const [allUsers, setAllUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUser = await getAllUser();
        setAllUsers([...allUser.data.forSendAllUsers]);

      } catch (err) {
        toast.error("Login error!");
      }
    }
    fetchData();
  }, []
  )

  return (
    <>
      <div className="flex flex-col w-[95%] sm:w-[600px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl">
        <h1 className='text-white uppercase text-2xl'> All users:</h1>
        {
          allUsers.map((user, id) => {
            return <div key={id} className='flex text-white'>
              <div>{user.email}</div>
              <div>active</div>
            </div>
          })
        }
      </div>
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
    </>
  )
}

export default AccessUserComponent