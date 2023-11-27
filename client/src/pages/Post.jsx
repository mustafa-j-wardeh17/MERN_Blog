import React from 'react'
import PostHero from '../components/PostComponents/PostHero'
import PostNavDetails from '../components/PostComponents/PostNavDetails'
import PostDetails from '../components/PostComponents/PostDetails'

const Post = () => {
  return (
    <div className='w-full'>
      <PostHero />
      <div className='md:px-[80px] px-8'>
        <PostNavDetails />
        <PostDetails />
      </div>

    </div>
  )
}

export default Post