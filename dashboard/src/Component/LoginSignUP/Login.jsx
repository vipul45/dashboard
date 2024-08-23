import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const LoginPage = ({ togglePage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let formErrors = {};
        if (!username) {
            formErrors.username = 'Username is required';
        }
        if (!password) {
            formErrors.password = 'Password is required';
        }
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Proceed with form submission (e.g., call an API)
            console.log('Form Submitted', { username, password });
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <h2 className="title">Login</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                    />
                    {errors.username && <div className="error">{errors.username}</div>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                    <button type="submit" className="login-button">Login</button>
                    <div className="sign-up">
                        Don't have an account?{' '}
                        <Link to="/signup">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
