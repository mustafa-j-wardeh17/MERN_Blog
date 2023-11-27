import React from 'react'

const PostHero = () => {
    return (
        <div>
            <div className='w-full relative h-[470px] '>
                <img src='/herocard1.jpg' className='absolute w-full h-full   z-[-999]' />
                <div className='flex flex-col justify-center items-center w-full h-full space-y-4'>
                    <button className='border-2 border-white bg-neutral-800 px-8 py-2 rounded-full text-white font-bold' >
                        Web Development
                    </button>
                    <h1 className='text-[32px] font-bold text-white w-[70%] text-center'>
                        Building Progressive Web Apps: Mobile Applications and Desktop Websites
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default PostHero