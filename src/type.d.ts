type User = {
    username: string;
    token?: string;
    password?: string;
    logedIn: boolean;
}

type UserAction = {
    type: string,
    user: User,
}

type AuthenticationState = {
    loggingIn: boolean;
    user: User | null;
}

type Colectivo = {
    id?: number;
    nombre: string,
}

type ColectivoAction = {
    type: string,
    colectivo: Colectivo;
}

type AlertAction = {
    type: string,
    message: string,
}