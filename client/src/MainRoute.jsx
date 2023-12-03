import React, { useEffect } from 'react'
import { Outlet, } from 'react-router-dom'
import Navbar from './components/CommonComponents/Navbar'
import Footer from './components/CommonComponents/Footer'


const MainRoute = () => {
    return (
        <div className='relative w-full h-full'>
            <img src='/bg.jpg' className='absolute w-full h-full z-[-999]' />
            <div className='py-4 lg:mx-[140px] md:mx-[80px] mx-8'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>

    )
}

export default MainRoute