import React from 'react'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ src }) => {
    const navigate = useNavigate()
    const id = 1
    const handlePostPage = () => {
        navigate(`/:${id}`)
    }
    return (
        <div className='w-full'>
            <div onClick={() => handlePostPage()} className='w-full shadow-sm cursor-pointer rounded-2xl overflow-hidden'>
                <img src={src} className=' w-full aspect-video' />
            </div>
            <div className='flex flex-col space-y-[1px] mt-3 px-1'>
                <p className='text-[12px] font-bold text-purple-700'>Category</p>
                <p onClick={() => handlePostPage()} className='cursor-pointer text-neutral-700 font-bold text-[14px] '>consectetur adipiscing elit. Pellentesque nisl diam, gravida ut eleifend ac,</p>
                <p className='text-[14px] text-neutral-400  tracking-wider'>Hanuary 01,2023</p>
            </div>
        </div>
    )
}

export default PostCard