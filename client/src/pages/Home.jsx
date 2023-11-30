import React, { useEffect, useState } from 'react'
import Navbar from '../components/CommonComponents/Navbar'
import Hero from '../components/HomeComponents/Hero'
import Posts from '../components/HomeComponents/Posts'
import { useDispatch } from 'react-redux'
import { SetIsAuth, SetLoggendId } from '../redux/blogSlice/blogSlice'
import axios from 'axios'
import Loader from '../components/CommonComponents/Loader'
import RecentPosts from '../components/CommonComponents/RecentPosts'
import CategoriesCard from '../components/CommonComponents/CategoriesCard'

const Home = () => {
    const dispatch = useDispatch();

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
                console.error('Error fetching posts:', error.message);
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
                            <div className='lg:w-[30%] md:w-[35%] w-full h-full md:relative'>
                                <div className=' flex flex-col space-y-6'>
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