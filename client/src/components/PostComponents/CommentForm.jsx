import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdPublish } from "react-icons/md";

import { SetIsAuth, SetLoggendId } from '../../redux/blogSlice/blogSlice';

const CommpentForm = () => {

    return (
        <div className='p-6 flex flex-col w-full space-y-6'>
            <div className='flex flex-col space-y-4'>
                <h1 className='font-bold text-[18px]'>Leave a Reply</h1>
                <div className='border' />
            </div>
        </div>
    )
}

export default CommpentForm