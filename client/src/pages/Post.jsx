import React, { useEffect, useState } from 'react'
import PostHero from '../components/PostComponents/PostHero'
import PostNavDetails from '../components/PostComponents/PostNavDetails'
import PostDetails from '../components/PostComponents/PostDetails'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { SetIsAuth, SetLoggendId } from '../redux/blogSlice/blogSlice'

const Post = () => {
  const id = useParams().postId
  const [post, SetPost] = useState({})
  const dispatch = useDispatch()
  const { userId } = useSelector(state => state.blog)

  const checkAuthentication = async () => {
    try {
      const response = await axios.get('/auth/verify');
      dispatch(SetLoggendId(response.data));
      dispatch(SetIsAuth(true));
    } catch (error) {
      console.log('Error', error);
      dispatch(SetIsAuth(false));
      dispatch(SetLoggendId(''));
    }
  };

  useEffect(() => {
    if (userId) {
      checkAuthentication();
    }

    const getPost = async () => {
      try {
        const response = await axios.get(`/post/${id}`)
        SetPost(response.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getPost()

  }, [])

  return (
    <div className='w-full'>
      <PostHero data={post} />
      <div className='md:px-[80px] px-8'>
        <PostNavDetails data={post} />
        <PostDetails data={post} />
      </div>

    </div>
  )
}

export default Post