import React from 'react';
import Navbar from '../../components/Layout/Navbar'; 

const MainNavbar = () => { 
    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Login', href: '/sign-in' },
        { label: 'Register', href: '/sign-up' },
    ];

    return (
        <Navbar brand="Task Managment " links={navLinks} bgColor="light" />
    );
}

export default MainNavbar;
