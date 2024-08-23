import React, { useEffect, useState } from 'react'
import PostHero from '../components/PostComponents/PostHero'
import PostNavDetails from '../components/PostComponents/PostNavDetails'
import PostDetails from '../components/PostComponents/PostDetails'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { SetIsAuth, SetLoggedUser, SetLoggendId } from '../redux/blogSlice/blogSlice'
import Loader from '../components/CommonComponents/Loader'
import CommentForm from '../components/PostComponents/CommentForm'
import CommentsComp from '../components/PostComponents/CommentsComp'

const Post = () => {
  const [loader, setLoader] = useState(true)
  const id = useParams().postId
  const [post, SetPost] = useState({})
  const dispatch = useDispatch()
  const { loggendId } = useSelector(state => state.blog)
  const navigate = useNavigate()
const checkAuthentication = async () => {
  try {
    const response = await axios.get('/auth/verify', {
      withCredentials: true, // Ensure cookies are sent
      headers: {
        // Include token if using JWT
        Authorization: `Bearer ${token}`, // Replace with actual token if needed
      }
    });
    dispatch(SetLoggendId(response.data.id));
    dispatch(SetLoggedUser(response.data.username));
    dispatch(SetIsAuth(true));
  } catch (error) {
    console.error('Authentication failed:', error);
    if (error.response) {
      // Handle specific error cases
      if (error.response.status === 401) {
        console.log('Unauthorized access: Please log in again.');
      } else {
        console.log('An error occurred: ' + error.response.data.message);
      }
    } else {
      console.log('Network error: Please check your connection.');
    }
    dispatch(SetIsAuth(false));
    dispatch(SetLoggendId(''));
    dispatch(SetLoggedUser(''));
  }
};

  useEffect(() => {
    checkAuthentication();

    const getPost = async () => {
      try {
        const response = await axios.get(`/post/${id}`)
        SetPost(response.data)
        setLoader(false)
      }
      catch (err) {
        console.log(err)
        setLoader(false)
        navigate('/*')
      }
    }
    getPost()

  }, [])

  return (
    <div className='w-full min-h-screen mt-6 flex flex-col'>
      {
        loader
          ? (
            <div className='shadow-2xl flex  min-h-screen items-center p-6'>
              <Loader />
            </div>
          )
          : (
            <div className='flex flex-col space-y-10'>
              <div className='shadow bg-white p-6 rounded-lg'>
                <PostHero data={post} />
                <PostDetails data={post} />
              </div>
              {loggendId !== '' && (
                <div className='shadow p-4 bg-white rounded-lg'>
                  <CommentForm data={post} />
                </div>
              )}

              <div className='shadow p-4 bg-white rounded-lg'>
                <CommentsComp data={post} />
              </div>
            </div>
          )
      }



    </div >
  )
}

export default Post
