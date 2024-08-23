import React, { useEffect, useState } from 'react'
import PostHero from '../components/PostComponents/PostHero'
import PostNavDetails from '../components/PostComponents/PostNavDetails'
import PostDetails from '../components/PostComponents/PostDetails'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { SetCreateMode, SetIsAuth, SetLoggedUser, SetLoggendId } from '../redux/blogSlice/blogSlice'
import { IoMdAddCircle } from "react-icons/io";
import Loader from '../components/CommonComponents/Loader'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast'


const CreatePost = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { loggendId, loggedUser } = useSelector(state => state.blog)
  const [err, setErr] = useState('')
  const [desc, setDesc] = useState('')
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
        setErr('Unauthorized access: Please log in again.');
      } else {
        setErr('An error occurred: ' + error.response.data.message);
      }
    } else {
      setErr('Network error: Please check your connection.');
    }
    dispatch(SetIsAuth(false));
    dispatch(SetLoggendId(''));
    dispatch(SetLoggedUser(''));
  }
};
  useEffect(() => {
    checkAuthentication()
    setUserId(loggendId)
  }, [err, loggendId])


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
        desc: desc,
        username: loggedUser,
        image: post.image,
        categories
      })
      setDesc('')
      setPost({
        title: '',
        desc: '',
        image: '/computer.jpg',
      })
      setErr('')
      setLoading(false)
      toast.success(`${loggedUser} added post successfully`)
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
    <div className='relative w-full flex bg-white p-4 rounded-md flex-col justify-center'>
      {
        loading &&
        (
          <div className='absolute transform  translate-y-[50%]   w-full h-full justify-center items-center'>
            <Loader />
          </div>
        )
      }
      <div className='flex relative w-full h-[470px] justify-center overflow-hidden items-center rounded-md shadow-md '>
        {
          post.image !== '' ? (
            <>
              <img src={post.image} className='absolute w-full h-full ' />
              <div className='bg-black text-[14px] py-2 px-6 rounded-sm  font-bold text-white absolute z-[2] top-4 right-0'>
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
            <input
              accept="image/*"
              type='file'
              className='hidden'
              onChange={handleImageChange} />
            <IoMdAddCircle size={26} className='cursor-pointer' />
          </label>
          <input type='text'
            placeholder='Title'
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className=' border-b-2 px-1 py-1 w-full focus:outline-none'
          />

        </div>
        <div>

          {/* <textarea
            value={post.desc}
            placeholder='Tell Your Story ...'
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
            className='border-2 p-3 rounded-md resize-y min-h-[130px] w-full focus:outline-none'
          /> */}
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={setDesc}
            className='rounded-md min-h-[130px] w-full '
          />

          {
            err !== '' && (
              <p>{err}</p>
            )

          }
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='px-2 text-[14px] bg-blue-500 w-[120px] py-2 rounded-md shadow-md text-white'>Add post</button>

        </div>
      </form>

    </div>
  )
}

export default CreatePost
