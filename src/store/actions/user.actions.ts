import { userService } from "../../services";
import { userConstants } from "../constants/user.constants";
import { history } from '../../helpers';
import { alertActions } from './';

export const userActions = {
    login,
    token_refresh,
    logout,
}

type DispatchType = {
    type: string,
    user?: string,
    error?: string,
    message?: string,
}

export function login(username: string, password: string) {
    return (dispatch: (arg0: DispatchType) => void) => {
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

export function token_refresh(user: User) {
    return (dispatch: (arg0: DispatchType) => void) => {
        if (user.token) {
            dispatch(request(user.username));
            userService.token_refresh(user.token).then(
                token => {
                    dispatch(success(user.username));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
        }
    };
    function request(username: string) { return { type: userConstants.TOKEN_REFRESH_REQUEST, username } }
    function success(username: string) { return { type: userConstants.TOKEN_REFRESH_SUCCESS, username } }
    function failure(error: string) { return { type: userConstants.TOKEN_REFRESH_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}