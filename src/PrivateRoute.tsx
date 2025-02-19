import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthenticationService from './services/authentication-service';

const PrivateRoute = () => {
  const isAuthenticated = AuthenticationService.isAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;