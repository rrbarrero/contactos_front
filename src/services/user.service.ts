import axios from "axios";
import { store } from "../store/store";

interface LoginData {
    username: string;
    password: string;
}

const login = async (username: string, password: string): Promise<User> => {
    const user: User = { username: '', logedIn: false };
    const url = process.env.REACT_APP_LOGIN_URL || "not env defined";

    let loginData: LoginData = {
        username: username,
        password: password,
    };


    const response = await axios.post(url, loginData);
    user.username = username;
    user.token = response.data.token;
    user.logedIn = true;
    localStorage.setItem('user', JSON.stringify(user));

    return user;
}

const token_refresh = async (): Promise<string> => {
    const url = process.env.REACT_APP_BASE_URL || "not env defined";

    const state = store.getState();
    if (!state.authentication.token) {
        throw new Error("Not token for refresh");
    }

    const user: User = state.authentication;

    let requestConfig = {
        headers: {
            Authorization: "Bearer " + user.token
        }
    }
    const response = await axios.post(
        url + `refresh_token`,
        requestConfig,
    );

    const newToken = response.data.token;
    user.token = newToken;
    localStorage.setItem('user', JSON.stringify(user));

    return newToken;

}


const isAuthenticated = (): boolean => {
    const state = store.getState();
    return state.authentication.logedIn || false;
   
}


export const userService = {
    login,
    isAuthenticated,
    token_refresh,
}