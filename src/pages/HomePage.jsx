import React from 'react'
import GraphHomeComponent from '../components/GraphHomeComponent'
import headerImg from "../assets/img/HeaderImage.jpg"

const HomePage = () => {
    const backgroundImage = `url(${headerImg})`;

    return (
        <div className='w-full h-screen bg-cover' style={{ backgroundImage }}>
            <GraphHomeComponent />
        </div>
    )
}

export default HomePage
