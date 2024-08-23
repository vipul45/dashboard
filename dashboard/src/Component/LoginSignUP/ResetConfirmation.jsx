import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetConfirmationPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        let formErrors = {};
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Here you would typically send a request to the server to update the password
            console.log('Password reset successful');
            navigate('/login'); // Redirect to login page
        }
    };

    return (
        <div className="container">
            <div className="reset-confirmation-box">
                <h2 className="title">Reset Password</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
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
                    <div className="password-field">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input"
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={showConfirmPassword}
                                onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                            Show Confirm Password
                        </label>
                    </div>
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                    <button type="submit" className="reset-button">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetConfirmationPage;
