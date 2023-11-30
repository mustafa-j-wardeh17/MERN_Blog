import React from 'react'
import { CiTimer } from 'react-icons/ci'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const PostHero = ({ data }) => {
    const { createMode } = useSelector(state => state.blog)
    return (
        <div>
            <div className='w-full relative h-[470px] rounded-md overflow-hidden'>
                <img src={data.image} className='absolute w-full h-full   ' />
            </div>
            <div className='flex space-x-4 text-[14px] tracking-wider mt-6 items-center text-neutral-400 '>
                <div className=' flex space-x-1 items-center '>
                    <FaRegUserCircle  className='text-blue-700'/>
                    <p>{data.username}</p>
                </div>
                <div className=' flex space-x-1 items-center '>
                    <CiTimer className='text-fuchsia-700 font-bold text-[16px]' />
                    <p> {data.createdAt.slice(0, 10)}</p>
                </div>
            </div>
        </div>
    )
}

export default PostHero