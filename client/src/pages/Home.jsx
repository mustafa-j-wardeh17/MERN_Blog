import React, { useEffect, useState } from 'react'
import Navbar from '../components/CommonComponents/Navbar'
import Hero from '../components/HomeComponents/Hero'
import Posts from '../components/HomeComponents/Posts'
import { useDispatch, useSelector } from 'react-redux'
import { SetIsAuth, SetLoggedUser, SetLoggendId, SetPosts, SetSearchPosts } from '../redux/blogSlice/blogSlice'
import axios from 'axios'
import Loader from '../components/CommonComponents/Loader'
import RecentPosts from '../components/CommonComponents/RecentPosts'
import CategoriesCard from '../components/CommonComponents/CategoriesCard'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loggendId, postsData, searchPosts, searchText } = useSelector(state => state.blog)
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


    const [loader, setLoader] = useState(true)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/post/posts');
                const postsData = response.data;
                setPosts(postsData);
                dispatch(SetPosts(postsData))
                dispatch(SetSearchPosts(searchText))
                setLoader(false); // Set loader to false once data is fetched
                return postsData;
            } catch (error) {
                console.error('Error fetching posts:', error.response.data.err);
                setLoader(false); // Make sure to set loader to false in case of an error
            }
        };
        fetchPosts();
    }, [searchText]);
    return (
        <div className='w-full min-h-screen flex flex-col '>
            <Hero posts={posts} loader={loader} />
            {
                loader ?
                    (<Loader />)
                    :
                    (
                        <div className='w-full flex md:flex-row flex-col-reverse justify-between md:space-x-12'>
                            <div className='md:w-[65%] w-full'>
                                <Posts posts={searchPosts} loader={loader} />
                            </div>
                            <div className='lg:w-[30%] md:w-[35%] block relative items-start w-full  '>
                                <div className='md:sticky top-0 mb-16  flex flex-col space-y-6'>
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
