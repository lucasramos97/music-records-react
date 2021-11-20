import React from 'react';
import { Navigate, useLocation } from 'react-router';

import AuthenticationService from '../../services/AuthenticationService';

function RequireAuthentication({ children }: { children: JSX.Element }) {
  let location = useLocation();
  let authenticationService = new AuthenticationService();

  if (!authenticationService.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuthentication;
