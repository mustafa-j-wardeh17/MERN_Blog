import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

const Posts = () => {

    const [posts, setPosts] = useState([1, 2, 3, 4, 5, 6, 7, 8, 74, 4, 21,701,123,564])
    const [postsSlice, setPostsSlice] = useState([])
    const [postsSliceIndex, setPostsSliceIndex] = useState(1)
    useEffect(() => {
        const newPostsSlice = []
        if (posts.length > 6) {
            for (let i = 0; i < Math.ceil(posts.length) / 6; i++) {
                let slice = posts.slice(i * 6, (i + 1) * 6)
                console.log(slice)
                newPostsSlice.push(slice)
                setPostsSlice(newPostsSlice)
                console.log(`post num ${i}` + postsSlice[i])
            }
        }
        else {
            postsSlice = []
        }
    }, [posts, postsSliceIndex])
    return (
        <div className='py-12'>
            <h1 className='md:text-[28px] text-[20px] text-neutral-700 font-bold mb-8'>Recent Posts</h1>
            <div className='grid gap-8 lg:grid-cols-3  sm:grid-cols-2 grid-cols-1'>
                {

                    postsSlice.length > 0
                        ? postsSlice[postsSliceIndex-1].map((index) => (
                            <PostCard key={index} src={'/herocard1.jpg'} />
                        ))
                        : posts.map((index) => (
                            <PostCard key={index} src={'/herocard1.jpg'} />
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