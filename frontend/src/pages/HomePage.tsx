import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../service/authService';
import jwt_decode from 'jwt-decode';

type DecodedToken = {
    role?: string;
  }

const HomePage = () => {
    
    const userStore = useSelector((store: any) => store.userSlicer.user);
    const { t } = useTranslation();
    const navigate = useNavigate();
    let welcomeMessage;
    // const [isAdminUser, setIsAdminUser] = useState<boolean>(false)

    useEffect(() => {
        // setIsAdminUser(isAdmin());
        console.log(isAdmin())
        console.log(localStorage.getItem("token-acc"))
        console.log((localStorage.getItem("token-acc" ) && jwt_decode<DecodedToken>(localStorage.getItem("token-acc" ))?.role === "admin") )
    },[isAdmin()]
    )

    if (!userStore || userStore?.role === "guest") {
        welcomeMessage = `${t("welcome")} - ${t("guest")}`
    } else if (userStore.role === "user") {
        welcomeMessage = `${t("welcome")} - ${t("user")}`
    } else if (userStore.role === "admin") {
        welcomeMessage = `${t("welcome")} - ${t("admin")}`
    }
    

    return (
        <div className='flex flex-col justify-center'>
            <h1 className='text-2xl text-center text-white'>{welcomeMessage}</h1>
            {(localStorage.getItem("token-acc" ) && jwt_decode<DecodedToken>(localStorage.getItem("token-acc" ))?.role === "admin") &&
                <button className='text-white bg-blue-700 mt-5 text-xl p-2 transition-transform duration-100 active:scale-95 m-auto' 
                onClick={() => navigate("/access-users")}>
                    Grant access to users
                </button>}
        </div>
    )
}

export default HomePage
