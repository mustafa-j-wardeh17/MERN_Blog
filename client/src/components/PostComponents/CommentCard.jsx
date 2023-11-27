import React from 'react'

const CommentCard = () => {
  return (
    <div className='w-full p-2 flex justify-between bg-neutral-200 rounded-md shadow text-[13px]'>
        <div className='flex flex-col '>
            <p>@username</p>
            <p className='pl-3'>comment details</p>
        </div>
        <div className='flex space-x-3 '>
            <p>Sun Aug 06,2023 18:07:01</p>
        </div>
    </div>
  )
}

export default CommentCard