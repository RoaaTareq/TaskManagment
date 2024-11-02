import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const location = useLocation();
  
    // Function to detect language from URL parameter
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const lang = params.get('lang');
  
      if (lang && (lang === 'en' || lang === 'ar')) {
        i18n.changeLanguage(lang);
      }
    }, [location, i18n]);;

  return (
    <button onClick={toggleLanguage}>
      {language === 'en' ? 'عربي' : 'English'}
    </button>
  );
}

export default LanguageSwitcher;