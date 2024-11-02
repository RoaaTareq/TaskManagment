import React, { useEffect } from 'react';
import Navbar from '../../components/Layout/Navbar'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MainNavbar = () => { 
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Function to toggle language and update the URL
    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang); // Change the language in i18next

        // Change the document direction
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';

        // Create a new URL object based on the current location
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLang); // Set the lang parameter
        navigate(url.pathname + url.search, { replace: true }); // Only use pathname and search
    };

    // Effect to set language based on URL parameter on component mount
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const langParam = params.get('lang');

        // Check if there's a language param in the URL
        if (langParam && langParam !== i18n.language) {
            i18n.changeLanguage(langParam);
        } else if (!langParam) {
            // If no lang param, set the default language if it's not set
            const defaultLang = 'en'; // Set this to whatever default you prefer
            i18n.changeLanguage(defaultLang);
        }

        // Set document direction based on language
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [location.search, i18n]);

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
        <Navbar brand={t('logo')} links={navLinks} bgColor="light" />
    );
};

export default MainNavbar;
