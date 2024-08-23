import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { ImProfile } from "react-icons/im";
import { LuDatabase } from "react-icons/lu";

const CategoriesCard = ({ }) => {
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState('')
    const { categories } = useSelector(state => state.blog)
    const [currentCategories, setCurrentCategories] = useState([])
    useEffect(() => {
        setCurrentCategories(categories)
    }, [categories])
    return (
        <div className=' flex flex-col bg-white/95 w-full p-6 rounded-md shadow-md'>
            <h1 className='font-bold'>Important Links</h1>
            <div className='border my-3' />
            <div className='flex flex-col text-[14px] w-full text-neutral-500 space-y-1 mt-4'>
                <button onClick={() => navigate('/profile')} className={`$text-neutral-500 capitalize cursor-pointer flex w-full items-center space-x-2  hover:text-black`} >
                    <ImProfile />
                    <p>Profile Page</p>
                </button>
                <div className='border ' />
            </div>
            <div className='flex flex-col text-[14px] w-full text-neutral-500 space-y-1 mt-4'>
                <button onClick={() => navigate('/myposts')}  className={`$text-neutral-500 capitalize cursor-pointer flex w-full items-center space-x-2  hover:text-black`} >
                    <LuDatabase  />
                    <p>My Posts</p>
                </button>
                <div className='border ' />
            </div>
            <div className='flex flex-col text-[14px] w-full text-neutral-500 space-y-1 mt-4'>
                <button onClick={() => navigate('/createpost')}  className={`$text-neutral-500 capitalize cursor-pointer flex w-full items-center space-x-2  hover:text-black`} >
                    <IoMdAdd />
                    <p>Create Post</p>
                </button>
                <div className='border ' />
            </div>

        </div>
    )
}

export default CategoriesCard