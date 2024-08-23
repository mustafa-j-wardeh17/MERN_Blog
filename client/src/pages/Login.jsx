import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SetIsAuth, SetLoggedUser, SetLoggendId } from '../redux/blogSlice/blogSlice';
import Loader from '../components/CommonComponents/Loader';

const Login = () => {
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [err, setErr] = useState('')
  const { loggendId } = useSelector(state => state.blog)

const checkAuthentication = async () => {
  try {
    const response = await axios.get('/auth/verify');

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
    checkAuthentication();
    if (loggendId !== '') {
      const isLoginPage = window.location.pathname === '/login';
      if (isLoginPage) {
        navigate('/');
      }
    }

  }, [loggendId])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      await axios.post('/auth/login', { email: data.email, password: data.password })
      setData({
        email: '',
        password: ''
      })
      navigate('/')
      setLoader(false)
    }
    catch (error) {
      if (error.response.status === 401 && error.response) {
        setLoader(false)

        console.log(error.response.data.err)
      }
      else {
        setLoader(false)

        console.log(error)
      }
    }


  }


  return (
    <div className='w-full h-screen bg-purple-50/20  flex flex-col justify-center items-center'>
      <div className='relative shadow-lg flex flex-col justify-center  rounded-md bg-[#fffefe]  h-[80%] p-4 space-y-4 px-[60px] lg:w-[620px] sm:w-[80%] w-full'>
        <div className='flex flex-col items-center'>
          <img src='/logo.svg' className='w-[30px] h-[30px]' />
          <h1 className='font-bold tracking-wider text-center text-[26px]'>Login</h1>
          <p className='text-neutral-600 mt-2 mb-8 text-[13px]'>Remember everything important.</p>
        </div>
        {/* <div className='flex flex-col space-y-2 justify-center'>
          <div onClick={() => { }} className='cursor-pointer flex justify-center items-center p-2 border px-4 rounded-md transition-all hover:bg-gray-100'>
            <FcGoogle />
            <p className='text-neutral-600 text-[14px] ml-2 tracking-wider'>Continue With Google</p>
          </div>
          <div onClick={() => { }} className='cursor-pointer flex justify-center items-center p-2 border px-4 rounded-md transition-all hover:bg-gray-100'>
            <FaApple />
            <p className='text-neutral-600 text-[14px] ml-2 tracking-wider'>Continue With Apple</p>
          </div>
          <div className='flex flex-row text-neutral-300 items-center'>
            <div className='h-[1px] w-[50%] bg-neutral-300' />
            <p className='mx-2'>or</p>
            <div className='h-[1px] w-[50%] bg-neutral-300' />

          </div>
        </div> */}
        <form onSubmit={handleLogin} className='flex flex-col items-center space-y-[6px] '>
          <input required value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} type="email" placeholder="Email" className='w-full text-[14px] py-3 px-[15px] text-neutral-600 border rounded-md  ' />
          <input required value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} type="password" placeholder="password" className='w-full text-[14px] py-3 px-[15px] text-neutral-600 border rounded-md ' />
          <button type="submit" className='flex items-center justify-center text-center text-neutral-100 font-bold bg-purple-600 p-2 w-full rounded-md shadow-md'>Login</button>
          {
            err !== null ?
              <p className='text-red-500 text-[13px]'>{err}</p>
              : ''
          }
        </form>
        <div className=' flex justify-center text-[14px] text-neutral-500 space-x-2 ' >
          <input type='checkbox' />
          <p>Remember me for 30 days</p>
        </div>
        <div className=' flex flex-col items-center text-[14px] space-y-1  text-neutral-500 space-x-2 ' >
          <p>Don't have an account?</p>
          <Link to={'/register'} className='text-purple-600 '>
            Create account
          </Link>
        </div>
        <div className={`${loader === true ? 'flex' : 'hidden'} justify-center pr-[110px] items-center absolute w-full h-full`}>
          <Loader />
        </div>
      </div>
    </div>
  )
}

export default Login
