import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const CommentForm = ({ data }) => {
    const { loggendId, loggedUser } = useSelector(state => state.blog)
    const [commentData, setCommentData] = useState({
        comment: "",
        name: '',
        email: ''
    })
    const [err, setErr] = useState('')
    const handlePost = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`/comment/create/${data._id}`, {
                comment: commentData.comment,
                username: loggedUser,
                userId: loggendId
            })
            setCommentData({
                comment: "",
                name: '',
                email: ''
            })
            setErr('')
        }
        catch (error) {
            if (error.response.status === 401 && error.response) {
                setErr(error.response.data.err)
            }
            else if (error.response.status === 400 && error.response) {
                setErr(error.response.data.err)
            }
            else if (error.response.status === 500 && error.response) {
                setErr(error.response.data.err)
            }
            else {
                setErr('Something went wrong!')
            }
        }

    }
    return (

        <div className='p-6 flex flex-col w-full space-y-6'>
            <div className='flex flex-col space-y-4'>
                <h1 className='font-bold text-[18px]'>Leave a Reply</h1>
                <div className='border' />
            </div>
            <form
                onSubmit={(e) => handlePost(e)}
                className='flex w-full flex-col space-y-4 ' >
                <textarea
                    value={commentData.comment}
                    placeholder='Comment'
                    onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                    className='w-full text-[13px] resize-y p-3 min-h-[160px] bg-[#efbed8]/10 rounded-md  focus:outline-none'
                />
                {/* <div className='flex md:flex-row text-neutral-600 flex-col gap-4'>
                    <input
                        value={commentData.name}
                        type='text'
                        placeholder='Name'
                        onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                        className='md:w-[50%] w-full px-3 bg-[#efbed8]/10 py-1 rounded-md   focus:outline-none' />
                    <input
                        value={commentData.email}
                        type='email'
                        placeholder='Email'
                        onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                        className='md:w-[50%] w-full px-3 bg-[#efbed8]/10 py-1 rounded-md   focus:outline-none' />
                </div> */}
                <br />
                <div className='flex flex-col space-y-1'>
                    <button
                        type='submit'
                        className='text-white text-center py-2 px-3 rounded-full w-[160px]  bg-[#f00582] shadow-md' >
                        Post Comment
                    </button>
                    <p className='text-[12px] ml-2 text-red-600'>
                        {err}
                    </p>
                </div>

            </form>
        </div>

    )
}

export default CommentForm