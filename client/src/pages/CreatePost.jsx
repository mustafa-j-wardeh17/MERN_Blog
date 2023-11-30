import React, { useEffect, useState } from 'react'
import PostHero from '../components/PostComponents/PostHero'
import PostNavDetails from '../components/PostComponents/PostNavDetails'
import PostDetails from '../components/PostComponents/PostDetails'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { SetCreateMode, SetIsAuth, SetLoggendId } from '../redux/blogSlice/blogSlice'
import { IoMdAddCircle } from "react-icons/io";
import Loader from '../components/CommonComponents/Loader'

const CreatePost = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { loggendId } = useSelector(state => state.blog)
  const [err, setErr] = useState('')
  const [post, setPost] = useState({
    title: '',
    desc: '',
    image: '/computer.jpg',
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
      setLoading(true)
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
      setLoading(false)
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
      setLoading(false)

    }
  }

  return (
    <div className='relative w-full flex flex-col justify-center'>
      {
        loading &&
        (
          <div className='absolute transform  translate-y-[50%]   w-full h-full justify-center items-center'>
            <Loader />
          </div>
        )
      }
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

      </div>
      <form onSubmit={handleSubmit} className="flex flex-col mt-3 space-y-6 ">
        <div className='flex space-x-2'>
          <label className=' font-bold flex items-center' >
            <input type='file' className='hidden' onChange={handleImageChange} />
            <IoMdAddCircle size={26} className='cursor-pointer' />
          </label>
          <input type='text'
            placeholder='Title'
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className=' rounded-md  px-1 py-1 w-full focus:outline-none'
          />
          <button type='submit' className='px-2 text-[14px] ml-10 bg-blue-500 min-w-[80px] rounded-md shadow-md text-white'>Add post</button>

        </div>
        <div>

          <textarea
            value={post.desc}
            placeholder='Tell Your Story ...'
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
            className=' rounded-md resize-y min-h-[130px] w-full focus:outline-none' />
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