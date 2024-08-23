import React from 'react'

const PostNavDetails = ({ data }) => {
    return (
        <div className='flex justify-evenly text-[14px] bg-purple-700 mt-8 p-3 items-center rounded-lg text-white font-bold'>
            {/* <p>{data.createdAt.slice(0, 10)}</p> */}
            <p>{data.createdAt}</p>
            <p>{23}views </p>
            <p>{10} min read</p>
            <p className='flex flex-row space-x-2 '>
                {
                    data?.categories?.map((cat) => (
                        <span key={cat}>{cat}</span>
                    ))
                }
            </p>
        </div>
    )
}

export default PostNavDetails