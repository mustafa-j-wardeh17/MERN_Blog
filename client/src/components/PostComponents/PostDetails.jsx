import React from 'react'
import CommentCard from './CommentCard'

const PostDetails = () => {
    return (
        <div className='flex flex-col space-y-4 mt-6'>
            <p className='text-[14px] text-neutral-700'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl diam, gravida ut eleifend ac, dictum scelerisque tortor. Phasellus congue ex eu felis hendrerit aliquet. Integer turpis augue, posuere eu justo sit amet, dictum maximus nunc. Curabitur porttitor mi condimentum pretium efficitur. Suspendisse eu orci risus. Praesent condimentum dolor convallis rhoncus blandit. Sed ac nibh mi. Nunc eget lacus rutrum, volutpat dui ullamcorper, fringilla risus. Maecenas dolor leo, consequat eu dapibus at, placerat ut ipsum.
                <br />
                <br />
                Duis eu sagittis magna. Sed maximus nunc orci, a fringilla lectus tristique sed. In hac habitasse platea dictumst. Nam in ultrices orci. Sed ultrices turpis leo, non molestie sem fringilla at. Nullam consequat dolor nec nisl semper, at auctor felis semper. Ut vitae eleifend tortor, id imperdiet diam. Etiam molestie magna bibendum enim rutrum tempor. Duis at ante ultricies, porttitor ex fringilla, tempus lorem.
                <br />
                <br />
                Donec bibendum ex et iaculis pulvinar. Aliquam erat volutpat. Mauris vel orci quis tortor blandit convallis at non sem. Nam dui risus, pharetra in sollicitudin sed, tempor at dui. Sed non eros leo. Duis vitae nulla sed arcu finibus iaculis vitae vel arcu. Nam viverra in sapien id dapibus. Mauris sodales lorem a commodo bibendum. Proin non metus non tellus cursus viverra ac tristique dui. Maecenas euismod mattis dignissim. Vestibulum tempus aliquet mauris, egestas egestas mi rhoncus ut. Integer iaculis ullamcorper magna eu pharetra. Integer ultrices dolor eget quam placerat pretium. Cras eu quam eget magna ornare dictum. Nam sit amet vehicula purus.
            </p>
            <div className='flex space-x-3 items-center'>
                <p className='font-bold text-neutral-700'>Categories</p>
                <div className='flex space-x-2' >
                    {
                        [1, 2, 3].map((item) => (
                            <p key={item} className='px-2 py-[3px] rounded-md bg-neutral-300 text-[12px] font-bold'>
                                javascript
                            </p>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col space-y-3 pt-2 '>
                <p className='font-bold text-neutral-700'>Categories</p>
                <div className='flex flex-col space-y-3' >
                    {
                        [1, 2, 3].map((item) => (
                            <CommentCard />
                        ))
                    }
                </div>
            </div>
            <div className='w-full flex justify-between space-x-2'>
                <input className='w-[87%] border border-neutral-500 rounded-md' type='text'/>
                <button className='w-[13%] py-2 text-center text-[14px] font-bold text-white bg-black'>Add Comment</button>
            </div>
        </div>
    )
}

export default PostDetails