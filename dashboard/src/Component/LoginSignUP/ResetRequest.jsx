import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetRequest.css'; // Import the CSS file

const ResetRequestPage = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let formErrors = {};
        if (!email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Email address is invalid';
        }
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Here you would typically send a request to the server to send a reset link
            console.log('Password reset link sent to', email);
            navigate('/reset-confirmation'); // Redirect to a confirmation page
        }
    };

    return (
        <div className="container">
            <div className="reset-request-box">
                <h2 className="title">Reset Password</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                    <button type="submit" className="reset-button">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default ResetRequestPage;
