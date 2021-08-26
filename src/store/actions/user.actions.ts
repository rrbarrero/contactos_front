import { userService } from "../../services";
import { userConstants } from "../constants/user.constants";
import { history } from '../../helpers';
import { alertActions } from './';

export const userActions = {
    login,
    logout,
}

export function login(username: string, password: string){
    return (dispatch: (arg0: { type: string; user?: string; error?: string; message?: string; }) => void) => {
       dispatch(request(username));
       userService.login(username, password).then(
           user => {
               dispatch(success(user));
               history.push('/');
           },
           error => {
               dispatch(failure(error.toString()));
               dispatch(alertActions.error(error.toString()));
           }
       );

    };
    function request(user: string) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user: string) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error: string) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}