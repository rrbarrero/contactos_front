import { Redirect, Route, RouteProps } from 'react-router-dom';
import { userService } from "../../services"

const UnProtectedRoute = ({ component: Component, path }: RouteProps) => {
  if (userService.isAuthenticated()) {
    return <Redirect to="/dashboard" />;
  }

  return <Route component={Component} path={path} />;
};

export default UnProtectedRoute;
