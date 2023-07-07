import React from 'react'
import HeaderHomePageComponent from './HeaderHomePageComponent'
import headerImg from '../assets/img/HeaderImage.jpg'

const GraphHomeComponent = () => {
    const backgroundImage = `url(${headerImg})`;
  return (
    <div className='w-full h-screen bg-cover' style={{backgroundImage}}>
      <HeaderHomePageComponent/>
    </div>
  )
}

export default GraphHomeComponent
