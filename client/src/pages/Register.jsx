import axios from 'axios'
import React, { useState } from 'react'
import { FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()
  const [err, setErr] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setErr(false);
      await axios.post('/auth/register', {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      })

      setData({
        firstname: '',
        lastname: '',
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
    <div className='w-full h-screen bg-purple-50/20 flex flex-col justify-center items-center'>
      <div className='shadow-lg shadow-green-100 flex flex-col justify-center rounded-md bg-white h-[90%] p-4  px-[60px] w-[420px] '>
        <div className='flex flex-col items-center'>
          <img src='/logo.svg' className='w-[30px] h-[30px]' />
          <h1 className='font-bold tracking-wider text-center text-[26px]'>Register</h1>
          <p className='text-neutral-600 mt-2 mb-4 text-[13px]'>Remember everything important.</p>
        </div>
        <div className='cursor-pointer flex flex-col space-y-2 justify-center'>
          <div onClick={handleGoogleRegister} className='flex justify-center items-center p-2 border px-4 rounded-md transition-all hover:bg-gray-100'>
            <FcGoogle />
            <p className='text-neutral-600 text-[14px] ml-2 tracking-wider'>Continue With Google</p>
          </div>
          <div onClick={handleAppleRegister} className='cursor-pointer  flex justify-center items-center p-2 border px-4 rounded-md transition-all hover:bg-gray-100'>
            <FaApple />
            <p className='text-neutral-600 text-[14px] ml-2 tracking-wider'>Continue With Apple</p>
          </div>
          <div className='flex flex-row text-neutral-300 items-center'>
            <div className='h-[1px] w-[50%] bg-neutral-300' />
            <p className='mx-2'>or</p>
            <div className='h-[1px] w-[50%] bg-neutral-300' />

          </div>
        </div>
        <form onSubmit={handleRegister} className='flex flex-col items-center  space-y-[6px] '>
          <div className='flex space-x-2 justify-between'>
            <input required value={data.firstname} onChange={(e) => setData({ ...data, firstname: e.target.value })} type="text" placeholder="firstname" className='w-full text-[14px] py-2 px-[15px] text-neutral-600 border rounded-md  ' />
            <input required value={data.lastname} onChange={(e) => setData({ ...data, lastname: e.target.value })} type="text" placeholder="lastname" className='w-full text-[14px] py-2 px-[15px] text-neutral-600 border rounded-md  ' />
          </div>
          <input required value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} type="email" placeholder="email" className='w-full text-[14px] py-2 px-[15px] text-neutral-600 border rounded-md  ' />
          <input required value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} type="password" placeholder="password" className='w-full text-[14px] py-2 px-[15px] text-neutral-600 border rounded-md  ' />
          <input required value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} type="password" placeholder="confirm password" className='w-full text-[14px] py-2 px-[15px] text-neutral-600 border rounded-md  ' />
          <button type="submit" className='flex items-center justify-center text-center text-neutral-100 font-bold bg-purple-600 p-2 w-full rounded-md shadow-md'>Register</button>
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