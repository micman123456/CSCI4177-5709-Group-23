import React from 'react';
import Navbar from '../components/Navbar';
import {useLocation} from 'react-router-dom';
import '../styles/landing.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';



function Landing() {
  const location = useLocation();
  return (
    <>
    <Navbar />
    <div className='landing-container'>
      <div className='landing-head'>
        <h1>Welcome to Taskpro</h1>
        <h2>Our Assignment/Task Management Tool for Students!</h2>

        </div>
        <div className='landing-main d-flex flex-column'>
        <div class="p-2">
        <h3>TaskPro</h3>
        <p>
        TaskPro is a comprehensive assignment and task management tool designed specifically for university/college students. With TaskPro, students can easily stay organized, track their tasks, manage due dates, and stay on top of their exam schedules
        </p>
        <br></br>
        </div>
        <div class="p-2">
        <h3>Purpose</h3>
        <p>
          Our web application is designed to provide a comprehensive assignment and task management solution for university/college students. With our tool, you can easily stay organized, keep track of your tasks, due dates, and exam schedules.
        </p>
        </div>
        <br></br>
        <div class="p-2">
        <h3>Goal</h3>
        <p>
          Our project aims to address the needs of students who want to effectively manage their academic responsibilities. We provide a user-friendly solution that allows you to set reminders for upcoming assignments, tests, events, and more. You can track your progress and even share reminders with anyone you choose, ensuring that you stay on top of your tasks.
        </p>
        </div>
        
        </div>
        
    <br/>
    <br/>
    <h2 style={{color:'#ccc'}}>Demo:</h2>
    <p>Check out some screenshots of our demo</p>
    

    <div className="images">
    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
    <img className="d-block w-100" src="/images/demo1.png" alt="First slide"/>
      <div class="carousel-caption d-none d-md-block">
        <h5 style={{ background: '#554971', color:'#ccc', padding:'5px'}}>Example of viewing upcoming Tasks</h5>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
    <img className="d-block w-100" src="/images/demo2.png" alt="First slide"/>
      <div class="carousel-caption d-none d-md-block">
      <h5 style={{ background: '#554971', color:'#ccc', padding:'5px'}}>Example of Managing Tasks</h5>
      </div>
    </div>
    <div class="carousel-item">
    <img className="d-block w-100" src="/images/demo3.png" alt="First slide"/>
      <div class="carousel-caption d-none d-md-block">
      <h5 style={{ background: '#554971', color:'#ccc', padding:'5px'}}>Example of Calender</h5>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>
<br></br>
<br></br>

<div className='get-started'>
  <div className='d-flex flex-column justify-content-around'>
          <div class="p-2" style={{display:'flex', justifyContent:'center'}}>
            <h2>Get started with TaskPro!</h2>
          </div>
          <div class="p-2" style={{display:'flex', justifyContent:'center'}}>
            <p>Click <strong>Get Started</strong> to get started with TaskPro, <strong>Contact us</strong> dirctly, or check out our <strong>FAQ</strong></p>
          </div>
          <div class="p-2" style={{display:'flex', justifyContent:'center'}}>
            <button className='btn btn-dark' style={{color:'#ccc',textDecoration:'none'}}>Get Started</button>
          </div>
            <div class="p-2" style={{display:'flex', justifyContent:'center'}}>
            <button className='btn btn-dark'><Link to="/contact" style={{color:'#ccc',textDecoration:'none'}}>Contact</Link></button>
          </div>
          <div class="p-2" style={{display:'flex', justifyContent:'center'}}>
          <button className='btn btn-dark'><Link to="/faq" style={{color:'#ccc',textDecoration:'none'}}>FAQ</Link></button>
          </div>
    </div>
  </div>
  <br>
  </br>

<div className='social-media'>
  <br></br>
        <h3>Follow us on social media:</h3>
        <br></br>
        <div className='social-icons d-flex flex-row justify-content-around'>
        <div class="p-2">
          <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faInstagram} size='2x' />
          </a>
          </div>
          <div class="p-2">
          <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faTwitter} size='2x' />
          </a>
          </div>
          <div class="p-2">
          <a href='https://www.youtube.com/' target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faYoutube} size='2x' />
          </a>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <p>
          Join our community of students, taking control of their academic journey with our powerful assignment/task management tool. Sign up now to experience a more organized and successful academic life.
        </p>
    </div>
    </>
  );
}

export default Landing;