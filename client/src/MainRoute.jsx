import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/CommonComponents/Navbar'
import Footer from './components/CommonComponents/Footer'

const MainRoute = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainRoute