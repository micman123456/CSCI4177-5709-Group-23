import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import './contact.css';


function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const formSub = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Message:', message);
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-container">
      <h1>Contact Information</h1>
      <br></br>
      <div className="contact-info">
        <h3>Email</h3>
        <p>TaskPro@example.com</p>

        <h3>Office Phone</h3>
        <p>+1 123-456-7890</p>
      </div>
      
      <div className="contact-form d-flex flex-column justify-content-center">
      <h1 style={{textAlign:'center'}}>Send us a message:</h1>
      <br></br>
      <form className='cform'>
        <div class="form-group" style={{marginTop:'5px'}}>
          <label for="exampleFormControlInput1">Your Email address:</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        <div class="form-group" style={{marginTop:'5px'}}>
          <label for="exampleFormControlTextarea1">Message:</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-outline-light" style={{marginTop:'5px'}}>Send</button>
      </form>
      <br></br>
      </div>

      <h1>Meet the team</h1>
      <br/>
      <div className='team d-flex flex-row'>
        
        <div class="card border-light mb-3" style={{width: "18rem", margin:"5px"}}>
          <div class="card-body">
            <h5 class="card-title">Ali Fadhil</h5>
            <h6 class="card-subtitle mb-2">Developer</h6>
            <p class="card-text">Email: al878898@dal.ca</p>
            <a href="#" class="card-link">Linkedin</a>
            <a href="#" class="card-link">Website</a>
          </div>
        </div>

        <div class="card border-light mb-3" style={{width: "18rem", margin:"5px"}}>
          <div class="card-body">
            <h5 class="card-title">Shuwei Ren</h5>
            <h6 class="card-subtitle mb-2">Developer</h6>
            <p class="card-text">Email: sh963289@dal.ca</p>
            <a href="#" class="card-link">Linkedin</a>
            <a href="#" class="card-link">Website</a>
          </div>
        </div>
        <div class="card border-light mb-3" style={{width: "18rem", margin:"5px"}}>
          <div class="card-body">
            <h5 class="card-title">Phuong Nguyen</h5>
            <h6 class="card-subtitle mb-2">Developer</h6>
            <p class="card-text">Email: phuongnguyen@dal.ca</p>
            <a href="#" class="card-link">Linkedin</a>
            <a href="#" class="card-link">Website</a>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Contact;