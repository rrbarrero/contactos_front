import { Redirect, Route, RouteProps } from 'react-router-dom';
import { userService } from "../../services"

const ProtectedRoute = ({ component: Component, path }: RouteProps) => {
  if (!userService.isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return <Route component={Component} path={path} />;
};

export default ProtectedRoute;
