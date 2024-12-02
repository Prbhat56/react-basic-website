import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Sigup';
import Login from './components/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Check if the user is authenticated
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/signup'; // Redirect to signup after logout
  };

  return (
    <Router>
      <div className={`app-container ${isAuthenticated ? 'with-sidebar' : ''}`}>
        {isAuthenticated && (
          <div className="sidebar">
            <h2>MyApp</h2>
            <ul>
              <li onClick={() => window.location.href = '/home'}>Home</li>
              <li>Profile</li>
              <li>Settings</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
        <div className="main-content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />} // Redirect to login if not authenticated
            />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
