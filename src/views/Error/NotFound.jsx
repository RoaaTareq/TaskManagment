import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../assets/style/notfound.css'; // Import custom CSS for styling

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <main className="not-found-page">
            <Container className="text-center">
                <div className="not-found-content">
                    <h1 className="not-found-title">404</h1>
                    <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>

                    <button 
                        className="back-home-button" 
                        onClick={handleBackToHome} 
                        aria-label="Go back to the homepage"
                    >
                        Back to Home
                    </button>
                </div>
            </Container>
        </main>
    );
};

export default NotFound;
