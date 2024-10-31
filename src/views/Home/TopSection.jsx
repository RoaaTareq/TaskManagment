import React, { useEffect, useState } from 'react';
import Heading from '../../components/Typography/Heading1'; // Ensure this path is correct
import style from '../../assets/style/home.module.css';
import Button from '../../components/Button/Button';

function TopSection() {
    // State to track whether the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to check local storage for logged in user
    const checkLoginStatus = () => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setIsLoggedIn(!!loggedInUser); // Update state based on presence of user data
    };

    useEffect(() => {
        checkLoginStatus(); // Check on initial render

        // Function to handle storage changes
        const handleStorageChange = () => {
            checkLoginStatus(); // Update state when local storage changes
        };

        // Set up event listener for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <section className={style.Main_section}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Heading 
                            level={1} 
                            text="Welcome to My Website, Start Organizing tasks with smooth experience" 
                            className="text-center text-white w-50 m-auto" 
                        />
                        {/* Conditionally render the Register button based on isLoggedIn state */}
                        {!isLoggedIn && (
                            <Button className={`mt-4 mb-4 m-auto d-flex justify-content-center ${style.btn_register}`}>
                                Register Now!
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TopSection;
