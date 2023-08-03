import React from 'react'
// import userImg from '../assets/img/user.png'

import { FaUserAlt } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { FaUnlock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LoginPageComponent = () => {
    const { t } = useTranslation();
    return (
        <div className='container mx-auto'>
            <div className=' sm:mx-11 mx-2 2xl:mx-48 mt-16'>

                <form action="" className='flex flex-col w-[95%] sm:w-[420px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl' >
                    <FaUserTie className='text-[8rem] text-white m-auto pb-5' />
                    <div className='relative'>
                        <input type="text" placeholder={t("register.email")} className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        < FaUserAlt className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="password" placeholder='*************' className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        <FaUnlock className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <input type="checkbox" />
                            <span className='ml-1 text-white '>{t("login.rememberMe")}</span>
                        </div>
                        <span className='text-white'>{t("login.forgotPassword")}</span>
                    </div>
                    <button className='text-white bg-blue-700 mt-5 text-xl p-2 uppercase'>{t("login")}</button>
                </form>

            </div>
        </div>
    )
}

export default LoginPageComponent;
