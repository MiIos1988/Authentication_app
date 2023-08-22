import React from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const userStore = useSelector((store) => store.userSlicer.user);
    const { t } = useTranslation();
    let welcomeMessage;

    if(!userStore || userStore.role === "guest"){
        welcomeMessage = `${t("welcome")} - ${t("guest")}`
    }else if(userStore.role === "user"){
        welcomeMessage = `${t("welcome")} - ${t("user")}`
    }else if(userStore.role === "admin"){
        welcomeMessage = `${t("welcome")} - ${t("admin")}`
    }

    return (
        <div>
            <h1 className='text-2xl text-center text-white'>{welcomeMessage}</h1>
        </div>
    )
}

export default HomePage
