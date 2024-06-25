import React, { Suspense, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { authService } from '../services/auth'
import { User } from '../services/user'

const UserLayout = () => {
    const Navigate = useNavigate()
    const [username, setUsername] = useState(null)
    useEffect(() => {
        const checkAuth = async () => {
            if (!authService.isLoggedIn() || authService.getUserRole() !== "User") {
                Navigate('/');
            }
            else {
                const usernameData = async () => {
                    const data = await User.getUsername()
                    return setUsername(data);
                };
                usernameData()
            }
        };
        checkAuth();
    }, [Navigate]);
   
}

export default UserLayout;