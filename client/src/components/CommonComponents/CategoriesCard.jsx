import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CategoriesCard = ({ }) => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const { categories } = useSelector(state => state.blog)
    const [currentCategories, setCurrentCategories] = useState([])
    useEffect(() => {
        setCurrentCategories(categories)
    }, [categories])
    return (
        <div className=' flex flex-col bg-white/95 w-full mt-32 p-6 rounded-md shadow-md'>
            <h1 className='font-bold'>Category</h1>
            <div className='border my-3' />
            <div className='flex flex-col text-[14px] text-neutral-500 space-y-4 mt-4'>
                {
                    currentCategories?.map((category, index) => (
                        <div key={index} className='flex flex-col '>
                            <p onClick={() => setSelectedCategory(category)} className={`${selectedCategory === category ? 'text-black' : 'text-neutral-500'} capitalize cursor-pointer hover:text-black`}>{category}</p>
                            < div className='border ' />
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default CategoriesCard