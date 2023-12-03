import React from 'react'
import HeroCard from './HeroCard'

const Hero = () => {
    return (
        <div className='py-12'>
            <h1 className='md:text-[28px] text-[20px] text-white font-bold mb-8'>Featured Posts</h1>
            <div className='w-full flex md:flex-row flex-col space-y-6 md:justify-between md:space-y-0 md:space-x-6'>
                <div className='relative flex items-end md:h-[400px] h-[400px] lg:w-[48%]  md:w-[55%] w-full rounded-md overflow-hidden bg-black/20 hover:bg-black/10'>
                    <img src='/headset.webp' className='absolute w-full h-full z-[-999]' />
                    <div className='pb-8 px-5 '>
                        <button className='text-[14px] bg-neutral-800 px-4 py-2 font-bold text-white rounded-full border-white border-2 hover:bg-neutral-600'>Productivity</button>
                        <p className='text-white font-bold text-[15px] mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl diam, gravida ut eleifend ac,</p>
                    </div>
                </div>
                <div className='flex lg:w-[48%]  md:w-[45%] md:h-[400px] h-[300px] w-full flex-col justify-between space-y-3'>
                    <HeroCard src={'/herocard1.jpg'} />
                    <HeroCard src={'/herocard2.jpg'} />
                </div>
            </div>
        </div>
    )
}

export default Hero