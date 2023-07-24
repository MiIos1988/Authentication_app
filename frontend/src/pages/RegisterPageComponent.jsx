import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { FaUnlock } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';


const RegisterPageComponent = () => {
    const { t } = useTranslation();
    const [registerInput, setRegisterInput] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const fillRegisterInput = e => {
        setRegisterInput({...registerInput, [e.target.name] : e.target.value})
    }
    const registerValidationSchema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().min(4, "Too Short!").max(25, "Too Long!").required(),
        email: yup.string().email("Invalid Email!").required(),
        password: yup.string().required(),
        confirmPassword: yup.string().required(),
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await registerValidationSchema.validate(registerInput, { abortEarly: false })
            console.log("ok")
        }catch(err){
            console.log(err.inner, "error*********")
        }
    }

    return (
        <div className='container mx-auto'>
            <div className=' sm:mx-11 mx-2 2xl:mx-48 mt-8'>

                <form action="" className='flex flex-col w-[95%] sm:w-[420px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl' >
                    <h1 className='text-white text-3xl uppercase m-auto pb-8'>{t("register")}</h1>
                    <div className='relative'>
                        <input type="text" placeholder={t("register.firstName")} name='firstName' onChange={fillRegisterInput} className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        < FaUserAlt className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="text" placeholder={t("register.lastName")} name='lastName' onChange={fillRegisterInput} className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        < FaUserAlt className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="text" placeholder={t("username")} name='username' onChange={fillRegisterInput} className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        < FaUserAlt className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="email" placeholder={t("register.email")} name='email' onChange={fillRegisterInput} className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        < MdMail className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="password" placeholder={t("register.password")} name='password' onChange={fillRegisterInput} className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        <FaUnlock className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="password" placeholder={t("register.confirmPassword")} name='confirmPassword' onChange={fillRegisterInput} className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        <FaUnlock className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>

                    <button className='text-white bg-blue-700 mt-5 text-xl p-2 uppercase' onClick={handleSubmit}>{t("register")}</button>
                </form>

            </div>
        </div>
    )
}

export default RegisterPageComponent
