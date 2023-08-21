import React from 'react'
import { useSelector } from 'react-redux';

const HomePage = () => {
    const userStore = useSelector((store) => store.userSlicer.user);
    let welcomeMessage;

    if(!userStore || userStore.role === "guest"){
        welcomeMessage = "Welcome - guest"
    }else if(userStore.role === "user"){
        welcomeMessage = "Welcome - user"
    }else if(userStore.role === "admin"){
        welcomeMessage = "Welcome - admin"
    }

    return (
        <div>
            <h1 className='text-2xl text-center text-white'>{welcomeMessage}</h1>
        </div>
    )
}

export default HomePage
