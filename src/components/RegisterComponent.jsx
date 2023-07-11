import React from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { FaUnlock } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

const RegisterComponent = () => {
  return (
    <div className='container mx-auto'>
            <div className=' sm:mx-11 mx-2 2xl:mx-48 mt-8'>

                <form action="" className='flex flex-col w-[95%] sm:w-[420px] mx-auto align-center  shadow-[35px_35px_60px_15px_rgba(0,0,0,0.7)]  sm:p-10 p-5 rounded-xl' >
                    <h1 className='text-white text-3xl uppercase m-auto pb-8'>Registration</h1>
                    <div className='relative'>
                        <input type="text" placeholder='First Name' className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        < FaUserAlt className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="text" placeholder='Last Name' className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        < FaUserAlt className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="text" placeholder='User Name' className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        < FaUserAlt className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="email" placeholder='Email Address' className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        < MdMail className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="password" placeholder='Password' className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        <FaUnlock className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    <div className='relative'>
                        <input type="password" placeholder='Confirm Password' className='mb-3 p-2 pl-14 focus:outline-none w-full text-xl' />
                        <FaUnlock className='absolute top-[10px] left-2 text-2xl text-blue-900' />
                    </div>
                    
                    <button className='text-white bg-blue-700 mt-5 text-xl p-2'>LOGIN</button>
                </form>

            </div>
        </div>
  )
}

export default RegisterComponent
