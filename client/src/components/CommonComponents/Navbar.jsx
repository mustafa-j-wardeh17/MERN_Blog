import React, { useState } from 'react'
import { IoIosMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const { isAuth } = useSelector(state => state.blog)
    const navigate = useNavigate
    const [Menu, setMenu] = useState(false)
    const [searchIcon, setSearcgIcon] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const handleMenu = () => {
        setMenu(!Menu)
    }
    const handleShowSearchIcon = () => {
        setSearcgIcon(true)
    }

    const handleHideSearchIcon = () => {
        setSearcgIcon(false)
    }

    const handleSearch = (e) => {
        e.preventDefault(e)
        setSearchValue(e.target.value)
    }

    const handleSubmitSearch = () => {
        setSearchValue('')
    }

    const handleLogout = async () => {
        setMenu(false)
        try {
            const response = await axios.get('/auth/logout')
            if (response.data.Status === "Success") {
                location.reload()
            }
            else{
                alert("error")
            }
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='flex justify-between items-center mb-5 md:px-[80px] px-8'>
            <Link to={'/'} className='flex items-center space-x-2 cursor-pointer'  >
                <img src='/logo.svg' className='w-[30px] ' />
                <h3>CodeBlog</h3>
            </Link>
            <form onSubmit={handleSubmitSearch} className='relative w-[40%] flex items-center'>
                <input onBlur={() => handleHideSearchIcon()}
                    onFocus={() => handleShowSearchIcon()}
                    value={searchValue}
                    onChange={(e) => handleSearch(e)}
                    type='text'
                    placeholder='search posts'
                    className={`w-240  border sm:py-2 w-full py-1 rounded-full transition-all ${searchIcon ? 'px-5' : 'px-3'}`}
                />
                <CiSearch size={22} className={`${searchIcon ? 'flex' : 'hidden'} cursor-pointer absolute right-3`}
                    onClick={handleSubmitSearch}
                />


            </form>
            {
                isAuth ?
                    (
                        <div onClick={handleMenu} className='cursor-pointer text-neutral-600 hover:text-neutral-800'>
                            <IoIosMenu size={32} />
                        </div>
                    )
                    : (
                        <div className='text-[14px] flex space-x-1'>
                            <Link to={'/login'}>Login</Link>
                            <span>/</span>
                            <Link to={'/register'}>Register</Link>
                        </div>
                    )
            }
            <div className={`${Menu ? 'flex' : 'hidden'} absolute bg-black  flex-col justify-center items-center w-[120px] px-2 py-3 space-y-2 sm:right-12 sm:top-12 right-2 top-14  rounded-md z-10`}>
                <Link to={'/'} onClick={() => setMenu(false)} className='text-gray-200 hover:text-white' >
                    Home
                </Link>
                <Link to={'/myposts'} onClick={() => setMenu(false)} className='text-gray-200 hover:text-white' >
                    My Posts
                </Link>
                <Link to={'/createpost'} onClick={() => setMenu(false)} className='text-gray-200 hover:text-white' >
                    Add Post
                </Link>
                <p onClick={() => handleLogout()} className='cursor-pointer text-gray-200 hover:text-white'>
                    Logout
                </p>


            </div>

        </div>
    )
}

export default Navbar