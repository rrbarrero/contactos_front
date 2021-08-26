import axios from "axios";

interface LoginData {
    username: string;
    password: string;
}

export const Login = async (username: string, password: string) => {
    const user: User = {logedIn: false};
    const url = process.env.REACT_APP_LOGIN_URL || "not env defined";

    let loginData: LoginData = {
        username: username,
        password: password,
    };

    try {
        const response = await axios.post(url, loginData)
        user.username = username
        user.token = response.data.token;
        user.logedIn = true
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.error(err);
    }
}