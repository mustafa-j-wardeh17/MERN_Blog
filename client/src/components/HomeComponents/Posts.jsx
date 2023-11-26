import React from 'react'
import PostCard from './PostCard'

const Posts = () => {
    return (
        <div className='py-12'>
            <h1 className='md:text-[28px] text-[20px] text-neutral-700 font-bold mb-8'>Recent Posts</h1>
            <div className='grid gap-8 lg:grid-cols-3  sm:grid-cols-2 grid-cols-1'>
                {
                    [1, 2, 3, 4, 5, 6].map((index) => (
                        <PostCard key={index} src={'/herocard1.jpg'} />
                    ))
                }
            </div>
        </div>
    )
}

export default Posts