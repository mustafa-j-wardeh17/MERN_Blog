import React, { useEffect, useState } from 'react'
import HeroCard from './HeroCard'
import { useSelector } from 'react-redux'
import axios from 'axios'
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

const Hero = ({ posts, loader }) => {
    const navigate = useNavigate()
    const { loggendId } = useSelector(state => state.blog)
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [imagePost, setImagePost] = useState({})

    useEffect(() => {
        const getPosts = () => {

            if (posts.length > 2) {
                setImagePost(posts[2])
                setFeaturedPosts(posts.slice(0, 2))
            }
            else if (posts.length === 1 || posts.length === 2) {
                setImagePost(posts[posts.length - 1])
            }
            else {
                setImagePost('')
            }
        }
        getPosts()

    }, [posts])

    return (
        <div className='py-12'>
            <h1 className='md:text-[28px] text-[20px] text-white font-bold mb-8'>Featured Posts</h1>
            {
                loader === false ? (
                    <div className='w-full flex md:flex-row flex-col space-y-6 md:justify-between md:space-y-0 md:space-x-6'>
                        <div className='relative flex items-end justify-center md:h-[400px] h-[400px] lg:w-[48%]  md:w-[55%] w-full rounded-md overflow-hidden bg-black/20 hover:bg-black/10'>
                            <img src={imagePost.image} className='absolute w-full h-full z-[-999]' />
                            <div className='pb-8 px-5 mb-[10px]'>
                                <button onClick={() => navigate(`/post/${imagePost._id}`)} className='text-[14px] bg-neutral-800 px-10 py-2 font-bold text-white rounded-full border-white border-2 hover:bg-neutral-600'>{imagePost.title}</button>
                            </div>
                        </div>
                        <div className='flex lg:w-[48%]  md:w-[45%] md:h-[400px] h-[300px] w-full flex-col justify-between space-y-3'>
                            {
                                featuredPosts.map((post) => (
                                    <HeroCard key={post._id} post={post} />
                                ))
                            }
                        </div>
                    </div>
                )
                    : (<></>)
            }
        </div>
    )
}

export default Hero