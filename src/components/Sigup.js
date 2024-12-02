import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    address: ['', ''],
    securityQuestion: '',
    answer: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/register', formData);
      setMessage(response.data.message);
      if (response.data.success) {
        setTimeout(() => {
          navigate('/login'); // Redirect to login after successful signup
        }, 2000);
      }
    } catch (error) {
      setMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              name="userName"
              className="form-control"
              placeholder="Enter Username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Address Line 1</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Address Line 1"
              value={formData.address[0]}
              onChange={(e) => setFormData((prevData) => ({ ...prevData, address: [e.target.value, prevData.address[1]] }))}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Address Line 2</label>
            <input
              type="text"
              name="address2"
              className="form-control"
              placeholder="Address Line 2"
              value={formData.address[1]}
              onChange={(e) => setFormData((prevData) => ({ ...prevData, address: [prevData.address[0], e.target.value] }))}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Security Question</label>
            <select
              name="securityQuestion"
              className="form-control"
              value={formData.securityQuestion}
              onChange={handleChange}
              required
            >
              <option value="">Select a Security Question</option>
              <option value="What is your pet's name?">What is your pet's name?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
              <option value="What was your first school?">What was your first school?</option>
              <option value="What city were you born in?">What city were you born in?</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Answer</label>
            <input
              type="text"
              name="answer"
              className="form-control"
              placeholder="Enter the answer to your security question"
              value={formData.answer}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
        <p className="text-center mt-3">
          Already registered? <Link to="/login">Sign in now</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
