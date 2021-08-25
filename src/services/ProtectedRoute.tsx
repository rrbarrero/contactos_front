import { Redirect, Route, RouteProps } from 'react-router-dom';

import { isAuthenticated } from './Auth';

const ProtectedRoute = ({ component: Component, path }: RouteProps) => {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return <Route component={Component} path={path} />;
};

export default ProtectedRoute;
