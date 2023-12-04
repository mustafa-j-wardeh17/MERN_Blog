import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SetIsAuth, SetLoggedUser, SetLoggendId } from '../redux/blogSlice/blogSlice'

const MyPosts = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loggendId } = useSelector(state => state.blog)
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(true)

  const checkAuthentication = async () => {
    try {
      const response = await axios.get('/auth/verify');
      dispatch(SetLoggendId(response.data.id));
      dispatch(SetLoggedUser(response.data.username));
      dispatch(SetIsAuth(true));
    } catch (error) {
      console.log('Error', error);
      dispatch(SetIsAuth(false));
      dispatch(SetLoggendId(''));
      navigate('/')
    }
  };

  useEffect(() => {
    checkAuthentication();

    const getPost = async () => {
      try {
        const response = await axios.get(`/post/user/${{ userId: loggendId }}`)
        setPosts(response.data)
        setLoader(false)
      }
      catch (err) {
        console.log(err)
        setLoader(false)
      }
    }
    getPost()
  }, [posts])

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/post/delete/${postId}`)
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='min-h-[800px]  bg-white rounded-md p-6 space-y-6 w-full'>
      <h1 className='text-[24px] font-bold' >My posts</h1>

      {
        posts.length > 0 ?
          (
            <div className='flex flex-col space-y-2'>
              {
                posts.map((post) => (
                  <div key={post._id} className='bg-neutral-100   flex space-x-4 w-full bg-white/95 rounded-md p-2 overflow-hidden h-[48%] '>
                    <div className=' h-full w-[220px] rounded-md overflow-hidden'>
                      <img onClick={() => navigate(`/post/${post._id}`)} src={post.image} className='cursor-pointer object-fill w-full h-full aspect-square' />
                    </div>
                    <div className='flex flex-col space-y-2 justify-center w-full'>
                      <h3 className='text-[12px] text-purple-600 font-bold tracking-wider space-x-1'>{post.categories}</h3>
                      <p onClick={() => navigate(`/post/${post._id}`)} className='cursor-pointer text-[14px] text-neutral-600 font-bold'>{post.title}</p>
                      <p className='text-[12px] text-neutral-400  tracking-wider'>{post.createdAt.slice(0, 10)}</p>
                      <div className='w-full flex  items-end justify-end'>
                        <button onClick={() => handleDeletePost(post._id)} className='text-white font-bold rounded-md shadow-md bg-red-500 h-[25px] text-[13px]  px-3'>Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )
          :
          (
            <h1>There is no posts to show you can create your first post from here <span className='flex'></span></h1>
          )
      }

    </div>
  )
}

export default MyPosts