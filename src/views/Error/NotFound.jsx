
import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Oops! Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <button onClick={() => navigate('/dashboard/task')}>Go Back to Dashboard</button>
        </div>
    );
};

export default NotFound;
