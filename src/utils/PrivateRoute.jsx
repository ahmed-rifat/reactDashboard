

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function PrivateRoute({ children }) {
  const { userInfo } = useUser();

  // Check if user is logged in, otherwise redirect to sign-in page
  if (!userInfo) {
    return <Navigate to="/" />; 
  }

  return children; // If user is logged in, render the children (protected content)
}

export default PrivateRoute;
