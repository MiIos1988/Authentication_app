import React from 'react'
import GraphHomeComponent from '../components/InputComponent'
import HeaderHomePageComponent from '../components/HeaderHomePageComponent'
import LoginComponent from '../components/LoginComponent'
import RegisterComponent from '../components/RegisterComponent'

const HomePage = () => {
    return (
        <div>
            <HeaderHomePageComponent/>
           <RegisterComponent/>
        </div>
    )
}

export default HomePage
