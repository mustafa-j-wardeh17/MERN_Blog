import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RecentPosts = ({ posts }) => {
    const navigate = useNavigate()
    const [recentPosts, setRecentPosts] = useState([])
    useEffect(() => {
        const newRecentData = posts.slice(-3)
        setRecentPosts(newRecentData)
    }, [posts])
    return (
        <div className='flex flex-col w-full md:mt-32 p-6 rounded-md shadow-md'>
            <h1>Recent Posts</h1>
            <div className='border my-3' />
            <div className=' flex flex-col space-y-4 mt-3'>
                {
                    recentPosts.map((post) => (
                        <div onClick={()=>navigate(`/${post._id}`)} className='flex cursor-pointer space-x-4 items-center'>
                            <img src='/herocard1.jpg' className='h-[50px] w-[50px] rounded-full' />
                            <div className='flex flex-col justify-between text-[14px] text-neutral-600 '>
                                <p>{post.createdAt.slice(0, 10)}</p>
                                <p>{post.title}</p>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default RecentPosts