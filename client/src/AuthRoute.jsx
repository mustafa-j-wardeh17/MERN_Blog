import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios';

const AuthRoute = () => {
    const [userId, setUserId] = useState('')
    const checkAuthentication = async () => {
        try {
            const response = await axios.get('/auth/verify');
            setUserId(response.data)
        } catch (error) {
            console.log('Error', error);
            setUserId('')
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, [])
    return (
        <div>
            {
                userId !== '' ?
                    (
                        <Outlet />
                    )
                    :(
                        <Navigate to={'/login'} />
                    )
            }
        </div>
    )
}

export default AuthRoute