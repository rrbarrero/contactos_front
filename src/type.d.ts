type User = {
    id?: number;
    username: string;
    token?: string;
    password?: string;
    logedIn: boolean;
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

type SubColectivos = SubColectivo[];

type Tratamiento = {
    id?: number;
    nombre: string;
}

type Tratamientos = Tratamiento[];

type Persona = {
    id?: number;
    nombre: string;
    apellidos: string;
    tratamiento: Tratamiento;
}

type Telefono = {
    id?: number;
    cargo?: number;
    nombre: string;
    numero: string;
    nota: string;
}

type Correo = {
    id?: number;
    cargo?: number;
    nombre: string;
    email: string;
    nota: string;
}

type Provincia = {
    id?: number;
    nombre: string;
}

type Provincias = Provincia[];

type Pais = {
    id?: number;
    nombre: string;
}

type Paises = Pais[];

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
    fechaCese?: string;
    fechaAlta: Date;
    fechaModificacion?: Date;
    colectivo: Colectivo;
    subcolectivo: SubColectivo;
    usuarioModificacion?: User;
    notas?: string;
    telefonos: Telefono[];
    correos: Correo[];
}

type Cargos = {
    rows: cargos[];
    nextPage: string;
    prevPage: string;
    count: number;
    currentPage: number;
}

type CustomDialog = {
    title: string,
    body: string,
    status: boolean,
    onAccept: () => void,
    onCancel: () => void,
}