import React, { useEffect, useState } from 'react'
import PostHero from '../components/PostComponents/PostHero'
import PostNavDetails from '../components/PostComponents/PostNavDetails'
import PostDetails from '../components/PostComponents/PostDetails'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { SetIsAuth, SetLoggendId } from '../redux/blogSlice/blogSlice'
import Loader from '../components/CommonComponents/Loader'
import CommentForm from '../components/PostComponents/CommentsComp'
import CommentsComp from '../components/PostComponents/CommentsComp'
import CommpentForm from '../components/PostComponents/CommentForm'

const Post = () => {
  const [loader, setLoader] = useState(true)
  const id = useParams().postId
  const [post, SetPost] = useState({})
  const dispatch = useDispatch()
  const { loggendId } = useSelector(state => state.blog)

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
      }
    }
    getPost()

  }, [])

  return (
    <div className='w-full mt-6 flex flex-col'>
      {
        loader
          ? (
            <div className='shadow-2xl  p-6'>
              <Loader />
            </div>
          )
          : (
            <div className='flex flex-col space-y-10'>
              <div className='shadow p-6 rounded-lg'>
                <PostHero data={post} />
                <PostDetails data={post} />
              </div>
              <div className='shadow p-4 rounded-lg'>
                <CommpentForm data={post} />
              </div>
              <div className='shadow p-4 rounded-lg'>
                <CommentsComp data={post} />
              </div>
            </div>
          )
      }



    </div >
  )
}

export default Post