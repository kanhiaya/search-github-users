import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// grab the children and collect the all the props
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  if (!isUser) {
    return <Navigate to='/login' />;
  }

  return children;
};
export default PrivateRoute;
