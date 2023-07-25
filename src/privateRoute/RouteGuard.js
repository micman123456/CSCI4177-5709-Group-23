import React from 'react';
import { Route, Navigate } from 'react-router-dom';

 
const RouteGuard = ({children}) => {
 
   function hasJWT() {
       let flag = false;
 
       //check user has JWT token
       const token = localStorage.getItem('token');
       if (token != null){
         flag = true;
       }
       return flag
   }
   if (hasJWT()){
    return children;
   }
   else{
    return <Navigate to="/login" />;
   }
 
   
};
 
export default RouteGuard;