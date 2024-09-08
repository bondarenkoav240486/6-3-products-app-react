// src/pages/ProtectedPage.js
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice'; // Import the logout action

const ProtectedPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Видаляємо токен з локального сховища
        localStorage.removeItem('token');
        
        // Очищаємо стан авторизації в Redux
        dispatch(logout());

        // Перенаправляємо на сторінку логіну
        navigate('/login');
    };

    return (
        <div>
            <h2>Protected Page</h2>
            <p>Welcome to the protected page! You have successfully logged in.</p>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    );
};

export default ProtectedPage;
