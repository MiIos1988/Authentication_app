import React from 'react'

const LoginComponent = () => {
    return (
        <div className='container mx-auto'>
            <div className=' mx-11 2xl:mx-48 '>
                <form action="" className='flex flex-col w-[30%] mx-auto ' >
                    <input type="text" placeholder='Username' className='mb-3 p-2 focus:outline-none' />
                    <input type="password" placeholder='*************' className='mb-3 p-2 focus:outline-none'/>
                </form>

            </div>
        </div>
    )
}

export default LoginComponent
