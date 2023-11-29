import React, { useEffect, useState } from 'react'
import PostHero from '../components/PostComponents/PostHero'
import PostNavDetails from '../components/PostComponents/PostNavDetails'
import PostDetails from '../components/PostComponents/PostDetails'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { SetCreateMode, SetIsAuth, SetLoggendId } from '../redux/blogSlice/blogSlice'

const CreatePost = () => {
  const navigate = useNavigate()
  const { loggendId } = useSelector(state => state.blog)
  const [err, setErr] = useState('')
  const [post, setPost] = useState({
    title: '',
    desc: '',
    image: '',
  })
  const username = 'mustafa abu wardeh'
  const categories = ['phone', 'technology']

  const [userId, setUserId] = useState('')
  const dispatch = useDispatch()

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
    if (loggendId) {
      checkAuthentication()
      setUserId(loggendId)
      console.log('error is ' + err)
      console.log('image: ' + post.image)
    }
    else {
      navigate('/')
    }
  }, [err])


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPost({ ...post, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/post/create/${userId}`, {
        title: post.title,
        desc: post.desc,
        username,
        image: post.image,
        categories
      })
      setPost({
        title: '',
        desc: '',
        image: '',
      })
      setErr('')
    }
    catch (error) {
      if (error.response.status === 400 && error.response) {
        setErr(error.response.data.err)
      }
      else if (error.response.status === 401 && error.response) {
        setErr(error.response.data.err)
      }

      else if (error.response.status === 500 && error.response) {
        setErr(error.response.data.err)
      }
      else {
        console.log(error)
      }
    }
  }

  return (
    <div className='w-full'>
      <div className='flex relative w-full h-[470px] justify-center items-center rounded-md shadow-md '>
        {
          post.image !== '' ? (
            <>
              <img src={post.image} className='absolute w-full h-full z-[-999]' />
              <div className='bg-black text-[14px] py-2 px-6 rounded-sm z-[-998] font-bold text-white absolute top-4 right-0'>
                <p>Add</p>
              </div>
            </>
          )
            : ''
        }
        <label className='text-white bg-black/70 px-5 py-2 font-bold'>
          <input type='file' className='hidden' onChange={handleImageChange} />
          <p>upload image</p>
        </label>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col mb-5 md:px-[80px] px-8 mt-20">
        <div>
          <p >
            Title
          </p>
          <input type='text' value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} className=' rounded-md border' />
        </div>
        <div>
          <p >
            Description
          </p>
          <input type='text' value={post.desc} onChange={(e) => setPost({ ...post, desc: e.target.value })} className=' rounded-md border' />
          <button type='submit' className='px-4 py-2 ml-10 bg-green-500 text-white'>Add post</button>
          {
            err !== '' && (
              <p>{err}</p>
            )

          }
        </div>

      </form>

    </div>
  )
}

export default CreatePost