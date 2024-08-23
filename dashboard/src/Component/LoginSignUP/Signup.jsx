import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

// Dummy async function to simulate an API call
const checkUsernameAvailability = async (username) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (username === 'takenUser') {
        return false; // Username is taken
    }
    return true; // Username is available
};

const SignUpPage = ({ togglePage }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = async () => {
        let formErrors = {};
        if (!username) {
            formErrors.username = 'Username is required';
        } else {
            setLoading(true);
            const isAvailable = await checkUsernameAvailability(username);
            setLoading(false);
            if (!isAvailable) {
                formErrors.username = 'Username is already taken';
            }
        }
        if (!email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Email address is invalid';
        }
        if (!password) {
            formErrors.password = 'Password is required';
        } else if (password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters long';
        }
        if (!confirmPassword) {
            formErrors.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword) {
            formErrors.confirmPassword = 'Passwords do not match';
        }
        return formErrors;
    };

    const handlePasswordChange = (e) => {
        const pass = e.target.value;
        setPassword(pass);
        setPasswordStrength(calculatePasswordStrength(pass));
    };

    const calculatePasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength += 1;
        if (/[A-Z]/.test(pass)) strength += 1;
        if (/[a-z]/.test(pass)) strength += 1;
        if (/\d/.test(pass)) strength += 1;
        if (/[!@#$%^&*]/.test(pass)) strength += 1;

        switch (strength) {
            case 1:
                return 'Very Weak';
            case 2:
                return 'Weak';
            case 3:
                return 'Moderate';
            case 4:
                return 'Strong';
            case 5:
                return 'Very Strong';
            default:
                return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = await validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Form Submitted', { username, email, password });
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <h2 className="title">Sign Up</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        disabled={loading}
                    />
                    {loading ? <div className="loading-message">Checking availability...</div> : null}
                    {errors.username && <div className="error">{errors.username}</div>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="input"
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                    {password && (
                        <div className={`password-strength ${passwordStrength.toLowerCase().replace(/\s/g, '-')}`}>
                            Strength: {passwordStrength}
                        </div>
                    )}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input"
                    />
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                    <button type="submit" className="sign-up-button">Sign Up</button>
                    <div className="sign-in">
                        Already have an account?{' '}
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
