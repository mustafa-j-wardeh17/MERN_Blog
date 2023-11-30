import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiTimer } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

const PostCard = ({ data }) => {
    const navigate = useNavigate()

    const handlePostPage = (id) => {
        navigate(`/${id}`)
    }
    return (
        <div className='w-full p-8 shadow-lg rounded-md'>
            <div onClick={() => handlePostPage(data._id)} className='w-full shadow-sm cursor-pointer rounded-md overflow-hidden'>
                <img src={data.image} className=' w-full aspect-[16/6]' />
            </div>
            <div className='flex flex-col items-center justify-center  mt-3 space-y-4'>
                <h1 onClick={() => handlePostPage(data._id)} className='cursor-pointer text-[24px] text-neutral-700 font-bold  '>
                    {data.title}
                </h1>
                <div className='flex space-x-4 text-[14px] tracking-wider items-center text-neutral-400 '>
                    <div className=' flex space-x-1 items-center '>
                        <FaRegUserCircle />
                        <p>{data.username}</p>
                    </div>
                    <div className=' flex space-x-1 items-center '>
                        <CiTimer className='text-fuchsia-600 font-bold text-[16]' />
                        <p> {data.createdAt.slice(0, 10)}</p>
                    </div>
                </div>
                <div className='text-[14px] font-bold text-purple-700'>
                    <div className='flex flex-row space-x-1 items-center'>
                        <BiSolidCategoryAlt />
                        {
                            data.categories?.map((cat, index) => (
                                <div key={index}>{cat}</div>
                            ))
                        }
                    </div>
                </div>
                <p>{data.desc.length > 20 ? data.desc.slice(0.20) + '...' : data.desc + ' ...'}</p>
                <button onClick={() => handlePostPage(data._id)} className='text-center px-6 py-2 bg-[#e70d8d] rounded-full text-neutral-100'>Continue Reading</button>
            </div>
        </div>
    )
}

export default PostCard