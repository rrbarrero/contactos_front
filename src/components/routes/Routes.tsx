import { Switch, Redirect, Router } from "react-router-dom"
import { userService } from "../../services"
import Dashboard from "../dashboard/Dashboard"
import Landing from "../login/Login"
import ProtectedRoute from "./ProtectedRoute"
import UnProtectedRoute from "./UnProtectedRoute"
import { history } from "../../helpers/";

const Routes = () => {

    const fallbackUri = `${userService.isAuthenticated() ? '/dashboard' : '/login'}`;


    return (
        <Router history={history}>
            <Switch>
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <UnProtectedRoute path="/login" component={Landing} />
                <Redirect to={fallbackUri} />
            </Switch>
        </Router>
    )
}

export default Routes;