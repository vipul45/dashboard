import React from 'react';
import { Link } from 'react-router-dom';
import './Success.css'; // Import the CSS file

const SuccessPage = () => {
    return (
        <div className="container">
            <div className="success-box">
                <h2 className="title">Login Successful</h2>
                <p>Welcome back! You have successfully logged in.</p>
                
            </div>
        </div>
    );
};

export default SuccessPage;
