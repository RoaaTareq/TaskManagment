import React from 'react';
import Footer from '../../components/Layout/Footer'; 
import { useTranslation } from 'react-i18next';
const MainFooter = () => {
    const { t } = useTranslation();
  

   

    return (
       
                <Footer copyright={t('copy')}  />
          
    );
};

export default MainFooter;
