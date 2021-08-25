import { BrowserRouter, Switch, Redirect } from "react-router-dom"
import { isAuthenticated } from "../../services/Auth"
import Dashboard from "../dashboard/Dashboard"
import Landing from "../login/Login"
import ProtectedRoute from "./ProtectedRoute"
import UnProtectedRoute from "./UnProtectedRoute"

const Routes = () => {

    const fallbackUri = `${isAuthenticated() ? '/dashboard' : '/login'}`;

    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <UnProtectedRoute path="/login" component={Landing} />
                <Redirect to={fallbackUri} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;