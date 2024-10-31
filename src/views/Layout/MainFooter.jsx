import React from 'react';
import Footer from '../../components/Layout/Footer'; 

const MainFooter = () => {
  

    const footerLinks = [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
    ];

    const socialLinks = [
        { label: 'Facebook', href: 'https://facebook.com', icon: '/path/to/facebook-icon.png' },
        { label: 'Twitter', href: 'https://twitter.com', icon: '/path/to/twitter-icon.png' },
    ];

    return (
       
                <Footer copyright="© 2024 MyWebsite" links={footerLinks} socialLinks={socialLinks} />
          
    );
};

export default MainFooter;
