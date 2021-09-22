import { userConstants } from "../constants";

let user: User = { username: '', logedIn: false }
const userData = localStorage.getItem('user')
if (userData) {
    user = JSON.parse(userData);
}

type UserAction = {
    type: string;
    payload: User;
}

export function authentication(state = user, action: UserAction): User {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                username: action.payload.username,
                logedIn: false,
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                username: action.payload.username,
                token: action.payload.token,
                logedIn: action.payload.logedIn,
            }
        case userConstants.LOGIN_FAILURE:
            return {
                username: action.payload.username,
                logedIn: false,
            }
        case userConstants.TOKEN_REFRESH_REQUEST:
            return {
                username: action.payload.username,
                logedIn: true,
                token: action.payload.token,
            }
        case userConstants.LOGOUT:
            return {
                username: '',
                logedIn: false,
            }
        default:
            return state
    }
}
