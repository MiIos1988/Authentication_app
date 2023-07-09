import React from 'react'
import HeaderHomePageComponent from './HeaderHomePageComponent'
import headerImg from '../assets/img/HeaderImage.jpg'
import graphImg from '../assets/img/sare-za-header.png'

const GraphHomeComponent = () => {
    const backgroundImage = `url(${headerImg})`;
  return (
    <div className='w-full h-screen bg-cover ' style={{backgroundImage}}>
      <HeaderHomePageComponent/>
      <div className='flex align-center'>

      <img src={graphImg} alt="graph" className='m-auto w-[1814px] transform rotate-[3deg] ' />
      {/* <img src={graphImg} alt="graph" className='m-auto w-[95%] transform rotate-[deg] absolute -left-5 top-[8.5%] bottom-[26.8%]' /> */}
      </div>
    </div>
  )
}

export default GraphHomeComponent
