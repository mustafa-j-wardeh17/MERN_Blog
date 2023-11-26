import React from 'react'
import Navbar from '../components/CommonComponents/Navbar'
import Hero from '../components/HomeComponents/Hero'
import Posts from '../components/HomeComponents/Posts'

const Home = () => {
    return (
        <div className='w-full flex flex-col'>
            <Hero />
            <Posts />
        </div>
    )
}

export default Home