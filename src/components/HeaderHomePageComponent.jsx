import React from 'react'
import logo from "../assets/img/Logo-1.png"

const HeaderHomePageComponent = () => {
    return (
        <div className='pt-10'>
             <div className='container mx-auto mt-10'>
                <nav className='mx-48 flex ' >
                    <img src={logo} alt="Logo" />
                    <ul className='flex list-none'>
                        <li>Početna</li>
                        <li>O nama</li>
                        <li>Usluge</li>
                        <li>Klijenti</li>
                        <li>Kontakt</li>
                        <li>Kontakt</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default HeaderHomePageComponent
