import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import axios from 'axios'
import Loader from '../CommonComponents/Loader'

const Posts = ({ posts }) => {
    const [postsSlice, setPostsSlice] = useState([])
    const [postsSliceIndex, setPostsSliceIndex] = useState(1)
    useEffect(() => {
        const newPostsSlice = []
        if (posts.length > 6) {
            for (let i = 0; i < Math.ceil(posts.length) / 6; i++) {
                let slice = posts.slice(i * 6, (i + 1) * 6)
                newPostsSlice.push(slice)
                setPostsSlice(newPostsSlice)
            }
        }
        else {
            setPostsSlice([])
        }
    }, [posts])
    return (
        <div className='py-12'>
            <h1 className='md:text-[28px] text-[20px] text-white font-bold mb-8'>Recent Posts</h1>

            <div className='flex flex-col space-y-10'>
                {

                    postsSlice.length > 0
                        ? postsSlice[postsSliceIndex - 1].map((data) => (
                            <PostCard key={data._id} data={data} />
                        ))
                        : posts?.map((data) => (
                            <PostCard key={data._id} data={data} />
                        ))
                }
            </div>



            <div className='flex justify-end mt-2'>
                {
                    posts.length > 6 ?
                        (<div className='flex w-[120px] bg-gray-200 justify-evenly rounded-md items-center border-neutral-400 border'>
                            <p onClick={() => setPostsSliceIndex(prev => prev !== 1 ? prev - 1 : prev)} className='w-1/3 text-center border-neutral-400 border-r'>
                                <span className={`${postsSliceIndex !== 1 ? 'cursor-pointer' : 'cursor-not-allowed'} text-[18px] font-bold tracking-widest`}>
                                    -
                                </span>
                            </p>
                            <p className='w-1/3 text-center border-neutral-400 border-r'><span className='cursor-pointer'>{postsSliceIndex}</span></p>
                            <p onClick={() => setPostsSliceIndex(prev => prev !== postsSlice.length ? prev + 1 : prev)} className='text-center w-1/3'>
                                <span className={`${postsSliceIndex !== postsSlice.length ? 'cursor-pointer' : 'cursor-not-allowed'} text-[18px] font-bold tracking-widest`}>
                                    +
                                </span>
                            </p>
                        </div>
                        )
                        : (<></>)
                }
            </div>
        </div>
    )
}

export default Posts