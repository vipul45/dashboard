import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file
import { toast } from 'react-toastify';

const LoginPage = ({ togglePage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Hook to navigate to different pages

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
            // Check credentials from local storage
            const storedCredentials = JSON.parse(localStorage.getItem('credentials'));
            if (storedCredentials && storedCredentials.username === username && storedCredentials.password === password) {
                toast("Login Succesfull")
                console.log('Login Successful');
                navigate('/farmlist'); // Redirect to success page
            } else {
                toast.error('Invalid username or password')
            }
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
                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            Show Password
                        </label>
                    </div>
                    {errors.password && <div className="error">{errors.password}</div>}
                    {errors.general && <div className="error">{errors.general}</div>}
                    <button type="submit" className="login-button">Login</button>
                    <div className="forgot-password">
                        <Link to="/reset-password">Forgot Password?</Link>
                    </div>
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
