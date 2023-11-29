// Layout.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { SetIsAuth, SetLoggendId } from '../redux/blogSlice/blogSlice';

const Layout = ({ children }) => {
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

    return <>{
        children
    }</>;
};

export default Layout;
