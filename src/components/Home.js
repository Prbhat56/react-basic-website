import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/getUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          setMessage(response.data.message || 'Failed to fetch user data.');
        }
      } catch (error) {
        setMessage('Error fetching user data. Please log in again.');
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <p className="text-center">{message || 'Loading...'}</p>;
  }

  return (
    <div className="home-container">
      <h1 className="welcome-message">Welcome, {userData.userName}!</h1>
      <div className="user-profile card mt-4 p-4">
        <h2 className="text-center">User Profile</h2>
        <div className="text-center mb-3">
          <img src={userData.profile} alt="Profile" className="img-fluid rounded-circle profile-img" />
        </div>
        <ul className="list-group">
          <li className="list-group-item"><strong>Username:</strong> {userData.userName}</li>
          <li className="list-group-item"><strong>Email:</strong> {userData.email}</li>
          <li className="list-group-item"><strong>Phone:</strong> {userData.phone}</li>
          <li className="list-group-item"><strong>Address:</strong> {userData.address.join(', ')}</li>
          <li className="list-group-item"><strong>User Type:</strong> {userData.usertype}</li>
          <li className="list-group-item"><strong>Account Created:</strong> {new Date(userData.createdAt).toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
