import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SetIsAuth, SetLoggedUser, SetLoggendId } from '../redux/blogSlice/blogSlice'
import Loader from '../components/CommonComponents/Loader'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast'

const MyPosts = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loggendId, loggedUser } = useSelector(state => state.blog)
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
  }, [loggendId])

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/post/delete/${postId}`)
      toast.error(`${loggedUser} deleted post successfully`)
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='min-h-[800px]  bg-white rounded-md p-6 space-y-6 w-full'>
      <h1 className='text-[24px] font-bold' >My posts</h1>

      {
        loader === true ? (<Loader />)
          : (
            <>
              {
                posts.length > 0 ?
                  (
                    <div className='flex flex-col space-y-4 w-full'>
                      {
                        posts.map((post) => (
                          <div key={post._id} className='   flex space-x-4 w-full  rounded-md p-2 overflow-hidden h-[48%] bg-neutral-100 '>
                            <div className='  w-full md:w-[500px] rounded-md overflow-hidden'>
                              <img onClick={() => navigate(`/post/${post._id}`)} src={post.image} className='cursor-pointer object-fill w-full aspect-square transition-all hover:opacity-50' />
                            </div>
                            <div className='flex flex-col space-y-2 justify-center w-full'>
                              <div className='text-[12px] md:text-[18px] sm:text-[16px] text-purple-600 font-bold tracking-wider flex space-x-1'>
                                {
                                  post.categories.map((category, index) => (
                                    <p key={index}>{category}</p>
                                  ))
                                }
                              </div>
                              <h1 onClick={() => navigate(`/post/${post._id}`)} className='cursor-pointer md:text-[22px] sm:text-[18px] text-[14px] text-neutral-600 font-bold transition-all hover:opacity-50'>{post.title}</h1>
                              <p className='text-[12px]  md:text-[18px] sm:text-[16px] text-neutral-400  tracking-wider'>{post.createdAt.slice(0, 10)}</p>
                            </div>
                            <div className='w-full flex  items-end justify-end space-x-2'>
                              <button onClick={() => handleDeletePost(post._id)} className='text-white font-bold rounded-md shadow-md bg-red-500 h-[25px] text-[13px] items-center flex space-x-1 px-3'><FaEdit /> Delete</button>
                              <button onClick={() => navigate(`/editpost/${post._id}`)} className='text-white font-bold rounded-md shadow-md bg-blue-500 h-[25px] text-[13px]  flex space-x-1 items-center px-3'><MdDelete /> Edit</button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )
                  :
                  (
                    <div className='flex flex-col min-h-[800px] items-center justify-center space-y-6'>
                      <h1 className='text-[18px]'>There is no posts to show you can create your first post from here </h1>
                      <button onClick={() => navigate('/createpost')} className='text-white font-bold bg-blue-500 w-[180px] py-2 rounded-md shadow-lg'>Create Post</button>

                    </div>
                  )
              }
            </>
          )
      }

    </div>
  )
}

export default MyPosts