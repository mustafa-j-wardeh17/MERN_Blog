import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetIsAuth, SetLoggedUser, SetLoggendId } from '../redux/blogSlice/blogSlice';

const Error = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
    }, []);
    return (
        <div className='relative min-h-[460px] w-full bg-gray-200  flex flex-col space-y-6 justify-center items-center rounded-md'>
            <div className='w-full flex flex-col justify-center items-center'>
                <img src='/pngegg.png' className='w-2/3 aspect-video' />
                <p className='text-neutral-600 text-[32px]'>Page not found</p>
            </div>
            <div className='border w-full border-neutral-300' />
            <div className='flex justify-center  h-full items-end'>
                {
                    loggendId !== '' ?
                        (
                            <button onClick={() => navigate('/')} className='w-[120px] shadow-lg rounded-md text-center py-2 bg-neutral-600 text-white'>Home</button>
                        )
                        :
                        (
                            <button onClick={() => navigate('/login')} className='w-[120px] shadow-lg rounded-md text-center py-2 bg-neutral-600 text-white'>Login</button>
                        )
                }
            </div>

        </div>
    )
}

export default Error
