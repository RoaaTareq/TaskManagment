
import React, { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        i18n.changeLanguage(language);
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', language);
    }, [language, i18n]);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en';
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
