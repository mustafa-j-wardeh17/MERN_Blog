import React, { useEffect } from 'react'
import Navbar from '../components/CommonComponents/Navbar'
import Hero from '../components/HomeComponents/Hero'
import Posts from '../components/HomeComponents/Posts'
import { useDispatch } from 'react-redux'
import { SetIsAuth, SetLoggendId } from '../redux/blogSlice/blogSlice'
import axios from 'axios'

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
    return (
        <div className='w-full flex flex-col md:px-[80px] px-8'>
            <Hero />
            <Posts />
        </div>
    )
}

export default Home