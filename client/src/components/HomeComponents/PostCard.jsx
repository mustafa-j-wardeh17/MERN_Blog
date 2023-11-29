import React from 'react'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ data }) => {
    const navigate = useNavigate()

    const handlePostPage = (id) => {
        navigate(`/${id}`)
    }
    return (
        <div className='w-full'>
            <div onClick={() => handlePostPage(data._id)} className='w-full shadow-md cursor-pointer rounded-2xl overflow-hidden'>
                <img src={data.image} className=' w-full aspect-video' />
            </div>
            <div className='flex flex-col space-y-[1px] mt-3 px-1'>
                <div className='text-[12px] font-bold text-purple-700'>
                    <div className='flex flex-row space-x-1'>
                        {
                            data.categories?.map((cat, index) => (
                                <div key={index}>{cat}</div>
                            ))
                        }
                    </div>
                </div>
                <p onClick={() => handlePostPage(data._id)} className='cursor-pointer text-neutral-700 font-bold text-[16px] '>
                    {data.title}
                </p>
                <p className='text-[10px] text-neutral-400  tracking-wider'>
                    {data.createdAt}
                </p>
            </div>
        </div>
    )
}

export default PostCard