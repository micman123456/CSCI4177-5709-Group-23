import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css'
import Navbar from '../components/Navbar';


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the signup logic, such as sending the form data to the server
    console.log(formData);
    // Reset the form after submission
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <>
    <Navbar/>
 <div className='form-container'>
  <h2>Registration</h2>
  <form className='reg-form'>
  <div className="row">
    <div className="col-md-6 mb-3">
      <label htmlFor="firstName">First name</label>
      <input type="text" className="form-control" id="firstName" placeholder="First name" required />
    </div>
    <div className="col-md-6 mb-3">
      <label htmlFor="lastName">Last name</label>
      <input type="text" className="form-control" id="lastName" placeholder="Last name" required />
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="email">Email</label>
    <input type="email" className="form-control" id="email" placeholder="Email" required />
  </div>
  <div className="mb-3">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password" required />
  </div>
  <div className="mb-3">
    <label htmlFor="confirmPassword">Confirm Password</label>
    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" required />
  </div>
  <div className="form-group">
  </div>
  <div class="d-flex justify-content-center">
    <button type="button" class="btn btn-success btn-block btn-lg">Register</button>
  </div>
  <p class="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"><u>Login here</u></Link></p>
  <br></br>
</form>


</div>  
</> 

  );
};

export default SignUp;
