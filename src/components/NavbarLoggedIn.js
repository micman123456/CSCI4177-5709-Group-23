import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the Navbar.css file

const NavbarLoggedIn = () => {
  return (
    
    <>
  <nav className="sidebar d-flex flex-column flex-shrink-0 p-3">
  <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
  <img className="d-block w-100" src="/images/taskProLogo2.png" alt="First slide"/>
    </a>
    <ul className="nav nav-pills flex-column mb-auto">
    <hr></hr>
      <li className="nav-item">
        <a href="#" className="nav-link active" aria-current="page">
          <svg className="bi me-2" width="16" height="16"><a href="#home"></a></svg>
          Dash
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-light">
          <svg className="bi me-2" width="16" height="16"><a href="#speedometer2"></a></svg>
          Profile
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-light">
          <svg className="bi me-2" width="16" height="16"><a href="#table"></a></svg>
          View Tasks
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-light">
          <svg className="bi me-2" width="16" height="16"><a href="#grid"></a></svg>
          Manage Tasks
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-light">
          <svg className="bi me-2" width="16" height="16"><a href="#table"></a></svg>
          Calendar
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-light">
          <svg className="bi me-2" width="16" height="16"><a href="#calculator"></a></svg>
          Grade Calculator
        </a>
      </li>
      <li>
        <a href="/logout" className="nav-link link-light">
          <svg className="bi me-2" width="16" height="16"><a href="#people-circle"></a></svg>
          Logout
        </a>
      </li>
    </ul>
  </nav>

</>
    
  );
};


export default NavbarLoggedIn;

