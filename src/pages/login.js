import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignUp.css';
import Navbar from '../components/Navbar';

const Login = () => {
  console.log(localStorage.getItem('token'))
  localStorage.removeItem('token');
  console.log(localStorage.getItem('token'))

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      

      if (response.data.success) {
        // Redirect to the dashboard page
        const token = response.data.token;
        // Store the token in local storage
        localStorage.setItem('token', token);
        window.location.href = '/dashboard';
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <>
    <Navbar/>
    <div className='form-container'>
      <form className='reg-form' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            id='form-button'
            className="btn btn-success btn-block btn-lg"
            type="submit"
          >
            Login
          </button>
        </div>
        <p className="text-center text-muted mt-5 mb-0">
          Don't have an account?{' '}
          <a href="/sign-up" className="fw-bold text-body">
            <u>Sign Up here</u>
          </a>
        </p>
        <br />
      </form>
    </div>
    </>
  );
};

export default Login;
