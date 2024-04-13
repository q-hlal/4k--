import React from 'react'
import Navbar from './Navbar'
import HeroBanner from './HeroBanner'
import FooterBanner from './FooterBanner'
import Footer from './Footer'
import './style.css'

const Main = () => {
  return (
    <div className='main-container'>
        <Navbar/>
        <HeroBanner/>
        <FooterBanner/>
        <Footer/>
    </div>
  )
}

export default Main