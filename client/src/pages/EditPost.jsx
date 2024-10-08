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
import parse from 'html-react-parser';
import { FaEdit } from "react-icons/fa";
import Post from './Post'
import toast from 'react-hot-toast'


const CreatePost = () => {
    const params = useParams()
    const postId = params.postid
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const { loggendId, loggedUser } = useSelector(state => state.blog)
    const [err, setErr] = useState('')
    const [desc, setDesc] = useState('')
    const [post, setPost] = useState({
        title: '',
        desc: '',
        image: '',
    })
    const categories = ['phone', 'technology']

    const dispatch = useDispatch()

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
        setLoading(true)
        checkAuthentication()
        getPost()
    }, [])

    const getPost = async () => {
        try {

            const PostData = await axios.get(`/post/${postId}`)
            setPost({
                title: PostData.data.title,
                desc: PostData.data.desc,
                image: PostData.data.image,
            })
            setLoading(false)
        }
        catch (error) {
            console.log(error.response)
        }
    }


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


    const handleEditPost = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await axios.patch(`/post/update/${postId}`, {
                title: post.title,
                desc: post.desc,
                username: loggedUser,
                image: post.image,
                categories
            })

            setErr('')
            setLoading(false)
            toast.success(`${loggedUser} edited post successfully`)
            console.log(`${loggedUser} update post with title ${post.title} successfully`)
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
            <form onSubmit={handleEditPost} className="flex flex-col mt-3 space-y-6 ">
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

                    <ReactQuill
                        theme="snow"
                        value={post.desc}
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
                    <button type='submit' className='text-[14px] bg-blue-500 w-[120px] py-2 rounded-md shadow-md flex flex-row items-center justify-center  text-white'><FaEdit className='mr-1' /> Edit post</button>
                </div>
            </form>

        </div>
    )
}

export default CreatePost
