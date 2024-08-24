import React from 'react';
import './AlertNotification.css';

const AlertNotification = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="alert-notification">
            <div className="alert-content">
                <p>{message}</p>
                <button onClick={onClose} className="alert-close-btn">
                    OK
                </button>
            </div>
        </div>
    );
};

export default AlertNotification;
