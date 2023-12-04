import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdPublish } from "react-icons/md";

import { SetIsAuth, SetLoggendId } from '../../redux/blogSlice/blogSlice';

const CommentsComp = ({ data }) => {
    const { loggendId, loggedUser } = useSelector(state => state.blog)
    const [comments, setComments] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [addComment, setAddComment] = useState('')
    const [currentComment, setCurrentComment] = useState('')
    const dispatch = useDispatch()
    const editComment = () => {
        setAddComment(data.comment)
        setEditMode(true)
    }

    const deleteComment = async (id) => {
        try {
            const response = await axios.delete(`/comment/delete/${id}`)
            dispatch(SetLoggendId(data.userId))
            dispatch(SetIsAuth(true))
        }
        catch (error) {
            console.log(error.response.err)
        }
    }
    useEffect(() => {
        fetchPostComment()
    }, [comments,loggendId])

    const fetchPostComment = async () => {
        try {
            const response = await axios.get(`/comment/comments/${data._id}`)
            setComments(response.data)
        }
        catch (error) {
            console.log(error)
        }

    }

    const handlePublish = async (commentId) => {
        try {
            await axios.patch(`/comment/update/${commentId}`, {
                comment: addComment,
                username: loggedUser,
                userId: loggendId,
                postId: data.postId
            })
            setAddComment('')
            setEditMode(false)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='p-6 flex flex-col w-full space-y-6'>
            <div className='flex flex-col space-y-4'>
                <h1 className='font-bold text-[18px]'>{comments.length} Comments</h1>
                <div className='border' />
            </div>
            {
                comments.map((comment) => (
                    <div key={comment._id} className='flex flex-col w-full space-y-2 '>
                        <div className='flex justify-between w-full space-x-4'>
                            <div className='flex text-[14px] w-full flex-col space-y-2'>
                                <div className='flex space-x-2 items-center' >
                                    <p className='font-bold text-black'>{comment.username} </p>
                                    <p className='text-[12px] text-neutral-600'>on {'Oct 08,2021'}</p>
                                </div>
                                {
                                    editMode && currentComment === comment._id
                                        ? (
                                            <textarea
                                                value={addComment}
                                                className='text-[12px] resize-y w-full border py-1 px-3 rounded-md'
                                                onChange={(e) => setAddComment(e.target.value)}
                                            />
                                        )
                                        : (
                                            <p className='text-[12px] text-neutral-600'>{comment.comment}</p>
                                        )
                                }
                            </div>
                            {
                                loggendId == comment.userId ? (
                                    <div className='flex items-end space-x-3'>
                                        {
                                            editMode && currentComment === comment._id ? (
                                                <button onClick={() => handlePublish(comment._id)} className='flex items-center space-x-1 bg-blue-500 text-white py-[2px] px-[4px] text-[12px] rounded-md shadow-md'>
                                                    <MdPublish />
                                                    <p>Publish</p>
                                                </button>
                                            )
                                                : (
                                                    <button onClick={() => { setEditMode(true); setAddComment(comment.comment); setCurrentComment(comment._id) }} className='flex items-center space-x-1 bg-green-500 text-white py-[2px] px-[4px] text-[12px] rounded-md shadow-md'>
                                                        <FaEdit />
                                                        <p>Update</p>
                                                    </button>
                                                )
                                        }
                                        <button onClick={() => deleteComment(comment._id)} className='flex items-center space-x-1 bg-red-500 text-white py-[2px] px-[4px] text-[12px] rounded-md shadow-md'>
                                            <MdDelete />
                                            <p>Delete</p>
                                        </button>
                                    </div>
                                )
                                    : ('')
                            }
                        </div>
                        <div className='border border-neutral-100 w-full' />

                    </div>
                ))
            }
        </div>
    )
}

export default CommentsComp