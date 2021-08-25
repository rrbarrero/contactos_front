import { User } from "../models/User";

export const isAuthenticated = (): boolean => {
    const userData: string|null = localStorage.getItem('user')
    if(userData){
        const user: User= JSON.parse(userData);
        if(user.logedIn){
            return true;
        }
    }
    return false
}

export const logOut = (): boolean =>{
    localStorage.removeItem('user');
    return true;
}