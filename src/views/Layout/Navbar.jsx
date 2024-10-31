import React from 'react';
import Navbar from '../../components/Layout/Navbar'; 
import { useNavigate } from 'react-router-dom';

const MainNavbar = () => { 
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const handleLogout = () => {
       
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    // Set up conditional navigation links
    const navLinks = loggedInUser
        ? [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Logout', href: '/', onClick: handleLogout } // Attach onClick directly
        ]
        : [
            { label: 'Home', href: '/' },
            { label: 'Login', href: '/sign-in' },
            { label: 'Register', href: '/sign-up' }
        ];

    return (
        <Navbar brand="Task Management" links={navLinks} bgColor="light" />
    );
};

export default MainNavbar;
