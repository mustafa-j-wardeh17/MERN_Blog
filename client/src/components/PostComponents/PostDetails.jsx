import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import axios from 'axios'
import { useSelector } from 'react-redux'

const PostDetails = ({ data }) => {
    const { isAuth, loggendId } = useSelector(state => state.blog)
    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState('')
    useEffect(() => {
        const fetchPostComment = async () => {
            try {
                const response = await axios.get(`/comment/comments/${data._id}`)
                setComments(response.data)
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchPostComment()
    }, [comments])

    const handleAddComment = async () => {
        try {
            const CreateComment = await axios.post(`/comment/create/${data._id}`, {
                comment: addComment,
                author: "kill$witsh",
                userId: loggendId,
            })
            setAddComment('')
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col space-y-4 mt-6'>
            <p className='text-[14px] text-neutral-700'>
                {data.desc}
            </p>
            <div className='flex space-x-3 items-center'>
                <p className='font-bold text-neutral-700'>Categories</p>
                <div className='flex space-x-2' >
                    {
                        data.categories?.map((cat) => (
                            <p key={cat} className='px-2 py-[3px] rounded-md bg-neutral-300 text-[12px] font-bold'>
                                {cat}
                            </p>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col space-y-3 pt-2 '>
                {
                    comments.length > 0 && (<p className='font-bold text-neutral-700'>Comments</p>)
                }
                <div className='flex flex-col space-y-3' >
                    {
                        comments?.map((comment) => (
                            <CommentCard key={comment._id} data={comment} />
                        ))
                    }
                </div>
            </div>
            {
                isAuth && (
                    <div className='w-full flex justify-between space-x-2'>
                        <input
                            value={addComment}
                            onChange={(e) => setAddComment(e.target.value)}
                            placeholder='Add Your Comment'
                            className='px-4 md:w-[87%] w-[80%] border border-neutral-500 rounded-md' type='text' />
                        <button onClick={handleAddComment} className='md:w-[13%] w-[20%] py-2 text-center md:text-[14px]  text-[12px] font-bold text-white bg-black'>Add Comment</button>
                    </div>
                )
            }
        </div>
    )
}

export default PostDetails