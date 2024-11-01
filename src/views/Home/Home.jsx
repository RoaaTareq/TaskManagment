
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

// Static data for services
const servicesData = [
    {
        title: 'Project Management',
        content: "Keep tasks in order, deadlines on track, and team members aligned with this system.",
        image: folderIcon,
    },
    {
        title: 'Meetings with Team',
        content: "Keep tasks in order, deadlines on track, and team members aligned with this system.",
        image: leafIcon,
    },
    {
        title: 'Task Management',
        content: "Keep tasks in order, deadlines on track, and team members aligned with this system.",
        image: megaphoneIcon,
    }
];

// Static data for features
const featuresData = [
    {
        title: 'Integrations',
        content: 'Connect the apps already used into your system workflow or add a Power-Up to fine-tune your specific needs.',
    },
    {
        title: '24/7 Support',
        content: 'No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.',
    },
    {
        title: 'Easy to Use',
        content: 'No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.',
    }
];


const Home = () => {
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
