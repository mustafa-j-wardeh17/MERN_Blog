import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SetIsAuth, SetLoggendId } from '../redux/blogSlice/blogSlice'
import { FaPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const Register = () => {

  const dispatch = useDispatch()
  const { loggendId } = useSelector(state => state.blog)
  const [data, setData] = useState({
    username: '',
    email: '',
    image: '/user.webp',
    password: '',
    confirmPassword: ''
  })
  const checkAuthentication = async () => {
    try {
      const response = await axios.get('/auth/verify');
      dispatch(SetLoggendId(response.data.id));
      dispatch(SetLoggedUser(response.data.username));
      dispatch(SetIsAuth(true));
      navigate('/')
    } catch (error) {
      console.log('Error', error.response.data.err);
      dispatch(SetIsAuth(false));
      dispatch(SetLoggendId(''));
      dispatch(SetLoggedUser(''));

    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setData({ ...data, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    checkAuthentication();
    console.log('userId' + loggendId)
    if (loggendId !== '') {
      const isLoginPage = window.location.pathname === '/register';
      if (isLoginPage) {
        navigate('/');
      }
    }

  }, [loggendId])



  const navigate = useNavigate()
  const [err, setErr] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setErr(false);
      await axios.post('/auth/register', {
        image: data.image,
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      })

      setData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      navigate('/login');

    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 401) {
        setErr(error.response.data.err);
      } else {
        console.error(error);
        // Handle other errors
      }
    }
  };

  const handleGoogleRegister = () => {

  }
  const handleAppleRegister = () => {

  }

  return (
    <div className='w-full h-screen bg-purple-50/20 flex  justify-center items-center'>
      <div className='shadow-lg shadow-green-100 flex flex-col justify-center rounded-md bg-white  py-8  px-[60px] w-[420px] '>
        <div className='flex flex-col items-center'>
          <img src='/logo.svg' className='w-[30px] h-[30px]' />
          <h1 className='font-bold tracking-wider text-center text-[26px]'>Register</h1>
          <p className='text-neutral-600 mt-2 mb-4 text-[13px]'>Remember everything important.</p>
        </div>
        <div className=' flex flex-col space-y-2 justify-center'>
          {/* <div onClick={handleGoogleRegister} className='flex justify-center items-center p-2 border px-4 rounded-md transition-all hover:bg-gray-100'>
            <FcGoogle />
            <p className='text-neutral-600 text-[14px] ml-2 tracking-wider'>Continue With Google</p>
          </div>
          <div onClick={handleAppleRegister} className='cursor-pointer  flex justify-center items-center p-2 border px-4 rounded-md transition-all hover:bg-gray-100'>
            <FaApple />
            <p className='text-neutral-600 text-[14px] ml-2 tracking-wider'>Continue With Apple</p>
          </div> */}


          <div className='flex flex-row text-neutral-300 space-x-2 justify-center my-8 items-center'>
            <div className='h-[1px] w-[33%] bg-neutral-300' />

            <div className='h-[70px] w-[70px] rounded-full bg-neutral-200 relative flex justify-center items-center overflow-hidden '>
              <img src={data.image} className=' h-full w-full object-cover absolute z-[10]' />
              <label className=' font-bold flex justify-center items-center' >
                <input
                  accept="image/*"
                  type='file'
                  className='hidden'
                  onChange={handleImageChange} />
                <FaPlus size={16} className='cursor-pointer text-neutral-700 flex justify-center items-center text-[14px] absolute z-[111]' />
              </label>

            </div>
            <div className='h-[1px] w-[33%] bg-neutral-300' />

          </div>


        </div>
        <form onSubmit={handleRegister} className='flex flex-col items-center  space-y-[8px] '>
          <input required value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} type="text" placeholder="username" className='w-full text-[14px] py-2 px-[15px] text-neutral-600 border rounded-md  ' />
          <input required value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} type="email" placeholder="email" className='w-full text-[14px] py-2 px-[15px] text-neutral-600 border rounded-md  ' />
          <input required value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} type="password" placeholder="password" className='w-full text-[14px] py-2 px-[15px] text-neutral-600 border rounded-md  ' />
          <input required value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} type="password" placeholder="confirm password" className='w-full text-[14px] py-2 px-[15px] text-neutral-600 border rounded-md  ' />
          <div className='w-full '>
            <button type="submit" className='flex items-center mt-2 justify-center text-center text-neutral-100 font-bold bg-purple-600 p-2 w-full rounded-md shadow-md'>Register</button>
          </div>
          {
            err !== null ?
              <p className='text-red-500 text-[13px]'>{err}</p>
              : ''
          }
        </form>
        <div className='flex flex-col text-center text-neutral-400 text-[13px] justify-center  space-x-2 mt-4' >
          <p className='text-center'>By Creating an account, you are agreeing to our</p>
          <p className='text-center'><a className='text-purple-500'>Terms of Service </a>and <a className='text-purple-500'>Privacy Policy</a>.</p>

        </div>
        <div className='flex flex-col text-[14px] items-center space-y-1 text-neutral-500 space-x-2 mt-4' >
          <p>Already have an account?</p>
          <Link to={'/login'} className='text-purple-500 '>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register