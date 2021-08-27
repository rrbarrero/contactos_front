import { userConstants } from "../constants";

type AuthenticationState = {
    loggingIn: boolean;
    user: User | null;
}

let initialState: AuthenticationState = { loggingIn: false, user: null };

const _userData = localStorage.getItem('user');
if (_userData) {
    const user: User = JSON.parse(_userData);
    initialState = { loggingIn: true, user };
}

export function authentication(state = initialState, action: UserAction): AuthenticationState {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                loggingIn: true,
                user: action.user,
            }
        case userConstants.LOGIN_FAILURE:
            return {
                loggingIn: false,
                user: null,
            }
        case userConstants.TOKEN_REFRESH_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
            }
        default:
            return state
    }
}
