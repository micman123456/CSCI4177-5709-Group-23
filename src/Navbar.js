import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the Navbar.css file

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul >
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/faq">
            FAQ
          </Link>
        </li>
      </ul>
      <ul>
        <li className='navbar-item'>
          <Link to="/get-started">
            Get Started
          </Link>
        </li>
      </ul>
    </nav>
  );
};


export default Navbar;

