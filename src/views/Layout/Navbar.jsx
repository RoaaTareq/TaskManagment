import React from 'react';
import Navbar from '../../components/Layout/Navbar'; 
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MainNavbar = () => { 
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang); // This should now work if i18n is initialized correctly
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    const navLinks = [
        ...(loggedInUser
            ? [
                { label: t('dashboard'), href: '/dashboard/' },
                { label: t('logout'), href: '/', onClick: handleLogout }
              ]
            : [
                { label: t('home'), href: '/' },
                { label: t('login'), href: '/sign-in' },
                { label: t('register'), href: '/sign-up' }
              ]
        ),
        { label: i18n.language === 'en' ? 'عربي' : 'English', href: '#', onClick: toggleLanguage }
    ];

    return (
        <Navbar brand={t('task_management')} links={navLinks} bgColor="light" />
    );
};

export default MainNavbar;
