import { Redirect, Route, RouteProps } from 'react-router-dom';

import { isAuthenticated } from './Auth';

const UnProtectedRoute = ({ component: Component, path }: RouteProps) => {
  if (isAuthenticated()) {
    return <Redirect to="/dashboard" />;
  }

  return <Route component={Component} path={path} />;
};

export default UnProtectedRoute;
