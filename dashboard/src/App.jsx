import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Component/LoginSignUP/Login';
import Signup from './Component/LoginSignUP/Signup';
import Success from "./Component/Success/FarmList";
import ResetRequest from './Component/LoginSignUP/ResetRequest';
import ResetConfirmation from './Component/LoginSignUP/ResetConfirmation';
import FarmList from './Component/Success/FarmList';
import FarmHealth from './Component/graphs/FarmHealth';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-password" element={<ResetRequest />} />
                <Route path="/reset-confirmation" element={<ResetConfirmation />} />
                <Route path="/FarmList" element={<FarmList />} />
                <Route path="/farmhealth/:farmName" element={<FarmHealth />} />
            </Routes>
        </Router>
    );
}

export default App;
