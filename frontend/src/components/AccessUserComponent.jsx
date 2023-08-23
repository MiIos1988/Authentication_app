import React from 'react'
import { useEffect } from "react";
import { getAllUser } from '../service/userService';

const AccessUserComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try{
        const allUser = await getAllUser();
        console.log(allUser);
      }catch(err){
        console.log(err)
      }
    } 
    fetchData();
  },[]
  )
  
  return (
    <div className="flex flex-col w-[95%] sm:w-[600px] mx-auto align-center text-white uppercase text-2xl shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl">
     <h1> All users:</h1>
     
    </div>
  )
}

export default AccessUserComponent