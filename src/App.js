import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Sigup";
import Home from "./components/Home";

import "./App.css";

const App = () => {
  // const [ setIsAuthenticated] = useState(false); // Add state to track authentication

  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" className="navbar-title">AI Detector</Link>
          </div>
          <ul className="navbar-menu">
            <li className="dropdown">
              <span className="dropdown-title">Products</span>
              <ul className="dropdown-menu">
                <li>Image Moderation</li>
                <li>Video Moderation</li>
                <li>Text Moderation</li>
                <li>AI Image Detection</li>
                <li>Deepfake Detection</li>
                <li>Video Anonymization</li>
              </ul>
            </li>
            <li className="dropdown">
              <span className="dropdown-title">Resources</span>
              <ul className="dropdown-menu">
                <li>Docs</li>
                <li>Blog</li>
                <li>API Reference</li>
              </ul>
            </li>
            <li>
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
