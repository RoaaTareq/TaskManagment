import React from 'react';
import TopSection from './TopSection';
import Features from './OurFeatures';
import Service from './OurService';

function Home (){
    const servicesData = [
        {
            title: 'Service 1',
            content: 'Description of service 1.',
            image: 'https://via.placeholder.com/150',
            footer: 'Footer content for service 1'
        },
        {
            title: 'Service 2',
            content: 'Description of service 2.',
            image: 'https://via.placeholder.com/150',
            footer: 'Footer content for service 2'
        },
        {
            title: 'Service 3',
            content: 'Description of service 3.',
            image: 'https://via.placeholder.com/150',
            footer: 'Footer content for service 3'
        }
    ];
    const featuresData = [
        {
            title: 'Service 1',
            content: 'Description of service 1.',
            image: 'https://via.placeholder.com/150',
            footer: 'Footer content for service 1'
        },
        {
            title: 'Service 2',
            content: 'Description of service 2.',
            image: 'https://via.placeholder.com/150',
            footer: 'Footer content for service 2'
        },
        {
            title: 'Service 3',
            content: 'Description of service 3.',
            image: 'https://via.placeholder.com/150',
            footer: 'Footer content for service 3'
        }
    ];
    return(
       <>
       <TopSection/>
       <Service services={servicesData}/>
       <Features features={featuresData}/>
       </>
    )
}

export default Home ;