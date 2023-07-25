import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  //const history = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userID');

    // Redirect the user to the login page
    return <Navigate to='/login'/>;
  };

  return (
    handleLogout()
  );
};

export default Logout;
