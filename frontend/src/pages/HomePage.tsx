import React from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../service/authService';

const HomePage = () => {
    const userStore = useSelector((store: any) => store.userSlicer.user);
    const { t } = useTranslation();
    const navigate = useNavigate();
    let welcomeMessage;

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
            {isAdmin() &&
                <button className='text-white bg-blue-700 mt-5 text-xl p-2 transition-transform duration-100 active:scale-95 m-auto' 
                onClick={() => navigate("/access-users")}>
                    Grant access to users
                </button>}
        </div>
    )
}

export default HomePage
