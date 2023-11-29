import React from 'react'
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='md:px-[80px] px-8'>
            <div className='bg-neutral-700 w-full rounded-lg mt-12'>
                <div className='flex flex-col items-center space-y-8 py-8'>
                    <h1 className='font-bold text-white text-[24px] text-center'>Interesting Stories | Updates | Guides</h1>
                    <p className='text-[13px] text-gray-50 w-[50%] text-center'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl diam, gravida ut eleifend ac, dictum scelerisque tortor. Phasellus congue ex eu felis hendrerit aliquet. Integer turpis augue,
                    </p>
                    <div className='flex justify-center w-[380px] items-center space-x-1 bg-white p-1 rounded-md'>
                        <input className='px-3 w-full py-1 border-neutral-800 border rounded-md ' placeholder='Enter your email' />
                        <input type='submit' className='text-white bg-neutral-800 px-2 py-1 rounded-md' value={'submit'} />
                    </div>
                    <div className='flex space-x-3 text-white '>
                        <FaGithub />
                        <FaLinkedin />
                        <FaTwitter />
                    </div>
                    <div className='border-neutral-500 border-2 w-full' />
                    <div className='flex justify-between text-white w-full px-4 md:text-[14px] text-[10px] font-bold  items-center'>
                        <p>&copy;2023 CodeBloug. All rights reserved.</p>
                        <p>Made with ♥ by Mustafa Abu Wardeh</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer