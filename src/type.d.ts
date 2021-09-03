type User = {
    id?: number;
    username: string;
    token?: string;
    password?: string;
    logedIn: boolean;
}

type UserAction = {
    type: string;
    payload: User;
}

type AuthenticationState = {
    loggingIn: boolean;
    user: User | null;
}

type Colectivo = {
    id?: number;
    nombre: string;
}

type Colectivos = Colectivo[];


type SubColectivo = {
    id?: number;
    colectivo: Colectivo;
    nombre: string;
}

type SubColectivos = SubColectivos[];

type ColectivoAction = {
    type: string;
    payload: Colectivos;
}

type SelectedColectivoAction = {
    type: string;
    payload: number[];
}

type searchContactoAction = {
    type: string;
    payload: string;
}

type AlertAction = {
    type: string;
    payload: string;
}

type Tratamiento = {
    id?: number;
    nombre: string;
}

type Persona = {
    id?: number;
    nombre: string;
    apellidos: string;
    tratamiento: Tratamiento;
}

type Telefono = {
    id?: number;
    cargo: number;
    nombre: string;
    numero: string;
    nota: string;
}

type Provincia = {
    id?: number;
    nombre: string;
}

type Pais = {
    id?: number;
    nombre: string;
}

type Cargo = {
    id?: number;
    persona: Persona;
    cargo: string;
    finalizado: boolean;
    ciudad: string;
    codPostal: string;
    direccion: string;
    provincia: Provincia;
    pais: Pais;
    empresa: string;
    fechaCese?: Date;
    fechaAlta: Date;
    fechaModificacion?: Date;
    colectivo: Colectivo;
    subcolectivo: SubColectivo;
    usuarioModificacion?: User;
    notas?: string;
    telefonos?: Telefono[];
}

type Cargos = {
    rows: cargos[];
    nextPage: string;
    prevPage: string;
    count: number;
    currentPage: number;
}

type CargoAction = {
    type: string;
    payload: Cargos;
}

type SelectedCargoAction = {
    type: string;
    payload: number[];
}

type SpinnerAction = {
    type: string;
    payload: boolean;
}