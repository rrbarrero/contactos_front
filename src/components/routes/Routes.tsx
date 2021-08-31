import { Switch, Redirect } from "react-router-dom"
import { Router } from "react-router";
import { userService } from "../../services"
import Dashboard from "../dashboard/Dashboard"
import Landing from "../login/Login"
import ProtectedRoute from "./ProtectedRoute"
import UnProtectedRoute from "./UnProtectedRoute"
import { history } from "../../helpers/";
import Contactos from "../contactos/Contactos"

const Routes = () => {

    const fallbackUri = `${userService.isAuthenticated() ? '/contactos' : '/login'}`;


    return (
        <Router history={history}>
            <Switch>
                <ProtectedRoute path="/contactos" component={Contactos} />
                <UnProtectedRoute path="/login" component={Landing} />
                <Redirect to={fallbackUri} />
            </Switch>
        </Router>
    )
}

export default Routes;