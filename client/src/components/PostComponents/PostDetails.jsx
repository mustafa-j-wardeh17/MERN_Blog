import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser';

const PostDetails = ({ data }) => {
    const { isAuth, loggendId } = useSelector(state => state.blog)


    return (
        <div className='flex flex-col space-y-4 mt-6'>
            <h1 className='text-[22px] capitalize font-bold text-neutral-800'>
                {data.title}
            </h1>
            <div className='text-[14px] text-neutral-700'>
                {parse(data.desc)}
            </div>
            <div className='flex space-x-3 items-center'>
                {/* <p className='font-bold text-neutral-700'>Categories</p>
                <div className='flex space-x-2' >
                    {
                        data.categories?.map((cat) => (
                            <p key={cat} className='px-2 py-[3px] rounded-md bg-neutral-300 text-[12px] font-bold'>
                                {cat}
                            </p>
                        ))
                    }
                </div> */}
            </div>

        </div>
    )
}

export default PostDetails