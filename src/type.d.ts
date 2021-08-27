type User = {
    username: string;
    token?: string;
    password?: string;
    logedIn: boolean;
}

type UserAction = {
    type: string,
    payload: User,
}

type AuthenticationState = {
    loggingIn: boolean;
    user: User | null;
}

type Colectivo = {
    id?: number;
    nombre: string,
}

type Colectivos = Colectivo[];

type ColectivoAction = {
    type: string,
    payload: Colectivos;
}

type AlertAction = {
    type: string,
    payload: string,
}