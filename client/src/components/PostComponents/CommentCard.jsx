import axios from 'axios';
import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';


const CommentCard = ({ data }) => {
  const { loggendId } = useSelector(state => state.blog)
  const [editMode, setEditMode] = useState(false)
  const [addComment, setAddComment] = useState('')
  const deleteComment = async () => {
    try {
      await axios.delete(`/comment/delete/${data._id}`)
    }
    catch (error) {
      console.log(error.response.err)
    }
  }

  const editComment = () => {
    setAddComment(data.comment)
    setEditMode(true)
  }

  const handleUpdateComment = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`/comment/update/${data._id}`, {
        comment: addComment,
        author: data.author,
        postId: data.postId
      })
      setEditMode(false)
      setAddComment('')
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full p-2 flex justify-between bg-neutral-200 rounded-md shadow text-[13px]'>
      <div className='flex flex-col '>
        <p>@{data.author}</p>
        {
          !editMode ? (
            <p className='pl-3'>{data.comment}</p>
          )
            : (
              <div className='relative flex items-center w-[260px]'>
                <input
                  className='w-full py-2 px-2 rounded-md border border-neutral-600'
                  value={addComment}
                  onChange={(e) => setAddComment(e.target.value)}
                  type='text' />
                <div onClick={(e) => handleUpdateComment(e)} className='absolute right-1 text-[16px] cursor-pointer' >
                  <FaEdit />
                </div>
              </div>
            )
        }
        <p className='pl-3'>{data.userId}</p>
      </div>
      <div className='flex  flex-col justify-between'>
        <div className='flex space-x-3 '>
          <p>{data.createdAt.slice(0, 10)}</p>
          <p>{data.createdAt.slice(11, 19)}</p>
        </div>
        {
          loggendId == data.userId ?
            (
              <div className='flex space-x-3 justify-end text-[16px] text-neutral-700'>
                {
                  !editMode && (<button onClick={() => editComment()} ><FaEdit /></button>)
                }
                <button onClick={() => deleteComment()} ><MdDelete /></button>
              </div>
            )
            : (<></>)
        }

      </div>
    </div >
  )
}

export default CommentCard