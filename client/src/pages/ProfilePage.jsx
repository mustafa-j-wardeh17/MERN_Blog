import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetIsAuth, SetLoggedUser, SetLoggendId } from '../redux/blogSlice/blogSlice';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { CiWarning } from 'react-icons/ci';
import Loader from '../components/CommonComponents/Loader';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const { loggendId } = useSelector(state => state.blog)
    const [deleteState, setDeleteState] = useState(false)
    const [deleteConfirm, setDeleteConfirrm] = useState('')
    const [user, setUser] = useState({
        username: '',
        image: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [prevUser, setPrevUser] = useState({
        username: '',
        image: '',
        email: '',
    })
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
        setLoader(true)
        checkAuthentication();
        PreviewUser();
    }, [loggendId]);

    const PreviewUser = async () => {
        try {
            const userData = await axios.get(`/user/${loggendId}`)
            setPrevUser({
                username: userData.data.username,
                email: userData.data.email,
                image: userData.data.image
            })
            setLoader(false)
        }
        catch (error) {
            if (error.response.status === 500 && error.response) {
                console.log(error.response.data.err)
            }
            else {
                console.log(error)
            }
            setLoader(false)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPrevUser({ ...prevUser, image: reader.result });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleUserEdit = async (e) => {
        e.preventDefault()
        try {
            axios.patch(`/user/${loggendId}`, {
                username: user.username,
                image: prevUser.image,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword
            }).then((res) => {
                console.log(`user with name ${res.data.username} updated successfully`)
            })
            setUser({
                username: '',
                image: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
        catch (error) {
            if ((error.response.status === 400 && error.response) || (error.response.status === 500 && error.response)) {
                console.log(error.response.data.err)
            }
            else {
                console.log(error)
            }
        }
    }
    const handleDeleteUser = async (e) => {
        e.preventDefault()
        try {
            await axios.delete(`/user/${loggendId}`)
            window.location.reload()
        }
        catch (error) {
            if (error.response.status === 500 && error.response) {
                console.log(error.response.data.err)
            }
        }
    }
    return (
        <>
            {
                loader ?
                    (
                        <Loader />
                    )
                    :
                    (
                        <div className='bg-white relative min-h-[600px] rounded-md flex md:flex-row flex-col '>
                            <div className='flex flex-col md:w-[40%] w-full border-r md:min-h-[400px] md:py-0 py-[80px] justify-center items-center space-y-2'>
                                <div className='h-[70px] w-[70px] rounded-full bg-neutral-200 relative flex justify-center items-center overflow-hidden '>
                                    <img src={prevUser.image} className=' h-full w-full object-cover absolute z-[10]' />
                                    <label className=' font-bold flex justify-center items-center' >
                                        <input
                                            accept="image/*"
                                            type='file'
                                            className='hidden'
                                            onChange={handleImageChange} />
                                        <FaPlus size={16} className='cursor-pointer text-neutral-700 flex justify-center items-center text-[14px] absolute z-[111]' />
                                    </label>
                                </div>
                                <h1 className='font-bold'>{prevUser.username}</h1>
                                <p className='text-[14px] text-neutral-600'>{prevUser.email}</p>
                            </div>

                            <div className='flex flex-col md:w-[60%] w-full border-r py-[60px] px-[40px]  space-y-6'>
                                <div className='flex flex-row justify-between'>
                                    <button onClick={() => (navigate('/'))} className='flex text-[14px] items-center space-x-1 font-bold text-neutral-600'><IoMdArrowBack /> Back To Home</button>
                                    <h1 className='font-bold'>Edit User</h1>
                                </div>
                                <form onSubmit={(e) => handleUserEdit(e)} className='flex h-full items-center text-[14px] flex-wrap gap-4'>
                                    <input
                                        placeholder={prevUser.email}
                                        className='border   h-[50px]  px-3 w-full rounded-md border-neutral-300'
                                        type='email'
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                    <input
                                        placeholder={prevUser.username}
                                        className='border  h-[50px]  px-3 w-full rounded-md border-neutral-300'
                                        type='text'
                                        value={user.username}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    />
                                    <input
                                        placeholder='Enter your password'
                                        className='border  h-[50px]  px-3 w-full rounded-md border-neutral-300'
                                        type='password'
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                    <input
                                        placeholder='Confirm Password'
                                        className='border   h-[50px] px-3 w-full rounded-md border-neutral-300'
                                        type='password'
                                        value={user.confirmPassword}
                                        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                    />
                                    <div className='flex w-full items-end justify-between'>
                                        <button onClick={() => setDeleteState(true)} type='button' className='flex justify-center items-center py-1 px-4 bg-red-500 text-white font-blod text-[14px] rounded-md shadow-md'> Delete User </button>
                                        <button type='submit' className='flex justify-center items-center py-1 px-4 bg-green-500 text-white font-blod text-[14px] rounded-md shadow-md'> Edit User </button>
                                    </div>
                                </form>
                            </div>

                            <div className={`${deleteState ? 'flex' : 'hidden'} absolute flex justify-center items-center z-[999] transform left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] w-full h-full bg-transparent`}>
                                <div className='p-5 flex flex-col space-y-2 bg-gray-50 shadow-md z-[100] md:w-[420px] md:h-[310px] sm:w-[70%] sm:h-[45%] w-[85%] h-[50%] rounded-xl'>
                                    <div className='flex justify-end'>
                                        <IoMdClose size={24} className='text-neutral-500' />
                                    </div>
                                    <h1 className='text-[24px] font-bold'>Delete User ?</h1>
                                    <div className='bg-amber-50 p-2 border items-center border-amber-600'>
                                        <div className='flex items-center space-x-1'>
                                            <CiWarning className='text-amber-800 text-[32px]' />
                                            <span>Are You sure you want to permanently delete your account ?</span>
                                        </div>
                                    </div>
                                    <p className='text-neutral-600'>Please type DELETE below to confirm. </p>
                                    <input
                                        value={deleteConfirm}
                                        type='text'
                                        placeholder='DELETE'
                                        onChange={(e) => setDeleteConfirrm(e.target.value)}
                                        className='p-[5px] border-neutral-400 border w-full text-[14px]'
                                    />
                                    <div className='flex justify-end items-end w-full space-x-2'>
                                        <button onClick={() => setDeleteState(false)} className='py-[5px] px-4  text-neutral-600 border border-neutral-400'>
                                            Cancel
                                        </button>
                                        <button
                                            className={`${deleteConfirm === 'DELETE' ? 'bg-red-500' : 'bg-gray-600 '} py-[5px] px-4  text-white`}
                                            disabled={deleteConfirm === 'DELETE' ? false : true}
                                            onClick={handleDeleteUser}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
            }
        </>
    )
}

export default ProfilePage
