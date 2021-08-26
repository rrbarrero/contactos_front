import axios from "axios";

interface LoginData {
    username: string;
    password: string;
}

const login = async (username: string, password: string): Promise<string> => {
    const user: User = {username: '', logedIn: false};
    const url = process.env.REACT_APP_LOGIN_URL || "not env defined";

    console.log(username, password);

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
    return username;
}


const isAuthenticated = (): boolean => {
    const userData: string|null = localStorage.getItem('user')
    if(userData){
        const user: User= JSON.parse(userData);
        if(user.logedIn){
            return true;
        }
    }
    return false
}

const logout = (): boolean =>{
    localStorage.removeItem('user');
    return true;
}

export const userService = {
    login,
    isAuthenticated,
    logout,
}