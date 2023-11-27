import React from 'react'
import Navbar from '../components/CommonComponents/Navbar'
import Hero from '../components/HomeComponents/Hero'
import Posts from '../components/HomeComponents/Posts'

const Home = () => {
    return (
        <div className='w-full flex flex-col md:px-[80px] px-8'>
            <Hero />
            <Posts />
        </div>
    )
}

export default Home