import React, { memo } from 'react';
import TopSection from './TopSection';
import Features from './OurFeatures';
import Service from './OurService';
import Banner from './Banner';
import Reson from './WhySystem';
import Manage from './Manage';

import folderIcon from '../../assets/icon/Folder.png';
import leafIcon from '../../assets/icon/leaf.png';
import megaphoneIcon from '../../assets/icon/megphone.png';
import { useTranslation } from 'react-i18next';



const Home = () => {
    const { t } = useTranslation();
    const servicesData = [
        {
            title:  t('project'),
            content:  t('project-text'),
            image: folderIcon,
        },
        {
            title: t('management'),
            content: t('management-text'),
            image: leafIcon,
        },
        {
            title: t('Task'),
            content:  t('managment-task'),
            image: megaphoneIcon,
        }
    ];
    const featuresData = [
        {
            title: t('Integrations'), 
            content: t('integration-text'), 
        },
        {
            title: t('support'), 
            content: t('support-text'), 
        },
        {
            title: t('easytouse'), 
            content: t('use-text'), 
        }
    ];

    return (
        <>
            <TopSection />
            <Service services={servicesData} />
            <Banner />
            <Reson />
            <Manage />
            <Features features={featuresData} />
        </>
    );
};

export default memo(Home);
