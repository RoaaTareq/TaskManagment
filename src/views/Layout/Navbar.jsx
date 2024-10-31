import React from 'react';
import Navbar from '../../components/Layout/Navbar'; 

const MainNavbar = () => { 
    const navLinks = [
        { label: 'Home', href: '/' },
        // { label: 'About', href: '/about' },
        // { label: 'Contact', href: '/contact' },
    ];

    return (
        <Navbar brand="TaskManament" links={navLinks} bgColor="light" />
    );
}

export default MainNavbar;
