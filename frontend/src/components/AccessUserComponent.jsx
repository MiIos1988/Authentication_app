import React, { useState } from "react";
import { useEffect } from "react";
import { changeUserActive, changeUserRole, getAllUser } from "../service/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccessUserComponent = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUser = await getAllUser();
        setAllUsers([...allUser.data.forSendAllUsers]);
      } catch (err) {
        toast.error("Login error!");
      }
    };
    fetchData();
  }, []);

  const changeChecked = async (event, email) => {
    try {
      const userActive = await changeUserActive({ isActive: event.target.checked, email })
      userActive.data === 'Ok' && event.target.checked ? toast.success(`Granted access for ${email}`) : toast.warning(`Access denied for ${email}`)
    } catch (err) {
      if (err.response && err.response.status === 415) {
        toast.error("User not found'!")
      } else {
        toast.error("Error when changing activity!")
      }
    }
  }
  const changeRole = async (event, email) => {
    try {
      const userRole = await changeUserRole({ role: event.target.value, email })
      if (userRole.data === 'Ok' && event.target.value === "admin") {
        toast.success(`Access level for ${email} is Admin`)
      } else if (userRole && event.target.value === "user") {
        toast.success(`Access level for ${email} is User`)
      } else if (userRole && event.target.value === "guest") {
        toast.success(`Access level for ${email} is Guest`)
      }
    } catch (err) {
      if (err.response && err.response.status === 415) {
        toast.error("User not found'!")
      } else {
        toast.error("Error when changing role!")
      }
    }
  }

  return (
    <>
      <div className="flex flex-col w-[95%] md:w-[700px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl ">
        <div className="flex justify-between text-white text-2xl mb-2">
          <h1> All users:</h1>
          <h1> Active</h1>
        </div>
        {allUsers.map((user, id) => {
          return (
            <div
              key={id}
              className="flex justify-between text-white text-xl border-b-4 border-black border-opacity-30 py-2 sm:pb-3 pb-10 relative"
            >
              <div className="flex  flex-col ">
                <div>{user.email}</div>
                <div>
                  {user.firstName} {user.lastName}
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <select className="mr-20 bg-[#032758] p-1 sm:static absolute left-0 bottom-1" defaultValue={user.role} onChange={(event) => changeRole(event, user.email)}>
                    <option value="guest">Guest</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <input type="checkbox" className="w-6 h-6 mr-5" defaultChecked={user.isActive} onChange={(event) => changeChecked(event, user.email)} />
              </div>
            </div>
          );
        })}
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
  );
};

export default AccessUserComponent;
