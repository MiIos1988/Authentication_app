import React from 'react'
import logo from "../assets/img/Logo-1.png"

const HeaderHomePageComponent = () => {
    return (
        <div className='pt-10'>
             <div className='container mx-auto mt-10'>
                <nav >
                    <img src={logo} alt="Logo" />
                </nav>
            </div>
        </div>
    )
}

export default HeaderHomePageComponent
