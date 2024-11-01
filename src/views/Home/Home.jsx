// Home.js
import React from 'react';
import TopSection from './TopSection';
import Features from './OurFeatures';
import Service from './OurService';
import Banner from './Banner';

import folderIcon from '../../assets/icon/Folder.png';
import leafIcon from '../../assets/icon/leaf.png';
import megaphoneIcon from '../../assets/icon/megphone.png';
// import integrationImage from '../../assets/images/Gears.svg'
// import Support from '../../assets/images/Search_Value.svg'
// import Smoothy from '../../assets/images/Integrations_Puzzle.svg'

function Home() {
    const servicesData = [
        {
            title: 'Project Management',
            content: "Keep tasks in order, deadlines on track, and team members aligned with this system.",
            image: folderIcon, // Use the imported image
        },
        {
            title: 'Meetings with Team',
            content: "Keep tasks in order, deadlines on track, and team members aligned with this system.",
            image: leafIcon, // Use the imported image
        },
        {
            title: 'Task management',
            content: "Keep tasks in order, deadlines on track, and team members aligned with this system.",
            image: megaphoneIcon, // Use the imported image
        }
    ];

    const featuresData = [
        {
            title: 'Integrations',
            content: 'Connect the apps already uses into your system workflow or add a Power-Up to fine-tune your specific needs.',
            // image: integrationImage,
          
        },
        {
            title: '24/7 Support',
            content: 'No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.',
            // image: Support,
          
        },
        {
            title: 'Esay to use',
            content: 'No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.',
            // image: Smoothy,
           
        }
    ];

    return (
        <>
            <TopSection />
            <Service services={servicesData} />
            <Banner/>
            <Features features={featuresData} />
        </>
    );
}

export default Home;
