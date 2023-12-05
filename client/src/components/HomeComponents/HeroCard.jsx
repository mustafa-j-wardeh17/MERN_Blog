import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroCard = ({ post }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/post/${post._id}`)} className=' flex space-x-4 w-full bg-white/95 rounded-md p-2 overflow-hidden h-[48%] transition-all cursor-pointer hover:bg-neutral-200'>
            <div className=' h-full w-[220px] rounded-md overflow-hidden'>
                <img src={post.image} className=' object-fill w-full h-full aspect-square' />
            </div>
            <div className='flex flex-col space-y-2 justify-center md:w-[220px] '>
                <h3 className='text-[16px] text-purple-600 font-bold tracking-wider'>{post.title}</h3>
                <p className='text-[13px] text-neutral-500 font-bold'>@ {post.username}</p>
                <p className='text-[12px] text-neutral-400  tracking-wider'>{post.createdAt.slice(0, 10)}</p>
            </div>
        </div>
    )
}

export default HeroCard