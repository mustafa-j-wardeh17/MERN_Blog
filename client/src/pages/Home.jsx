import React, { useEffect, useState } from 'react'
import Navbar from '../components/CommonComponents/Navbar'
import Hero from '../components/HomeComponents/Hero'
import Posts from '../components/HomeComponents/Posts'
import { useDispatch, useSelector } from 'react-redux'
import { SetIsAuth, SetLoggedUser, SetLoggendId } from '../redux/blogSlice/blogSlice'
import axios from 'axios'
import Loader from '../components/CommonComponents/Loader'
import RecentPosts from '../components/CommonComponents/RecentPosts'
import CategoriesCard from '../components/CommonComponents/CategoriesCard'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate('/login')
    const { loggendId } = useSelector(state => state.blog)
    const checkAuthentication = async () => {
        try {
            const response = await axios.get('/auth/verify');
            dispatch(SetLoggendId(response.data.id));
            dispatch(SetLoggedUser(response.data.username));
            dispatch(SetIsAuth(true));
        } catch (error) {
            console.log('Error', error);
            dispatch(SetIsAuth(false));
            dispatch(SetLoggendId(''));
            dispatch(SetLoggedUser(''));
            navigate('/login')
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);


    const [loader, setLoader] = useState(true)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/post/posts');
                const postsData = response.data;
                setPosts(postsData);
                setLoader(false); // Set loader to false once data is fetched
                return postsData;
            } catch (error) {
                console.error('Error fetching posts:', error.response.data.err);
                setLoader(false); // Make sure to set loader to false in case of an error
            }
        };

        fetchPosts();
    }, []);
    return (
        <div className='w-full flex flex-col '>
            <Hero />
            {
                loader ?
                    (<Loader />)
                    :
                    (
                        <div className='w-full flex md:flex-row flex-col-reverse justify-between md:space-x-12'>
                            <div className='md:w-[65%] w-full'>
                                <Posts posts={posts} loader={loader} />
                            </div>
                            <div className='lg:w-[30%] md:w-[35%] block relative items-start w-full  '>
                                <div className='md:sticky top-0   flex flex-col space-y-6'>
                                    <RecentPosts posts={posts} />
                                    <CategoriesCard />
                                </div>
                            </div>
                        </div>
                    )
            }

        </div>
    )
}

export default Home