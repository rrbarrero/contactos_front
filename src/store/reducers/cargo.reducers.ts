import { cargoConstants } from "../constants";

export let initialCargoState: Cargo = {
    persona: {
        tratamiento: { nombre: '' },
        nombre: '',
        apellidos: ''
    },
    cargo: '',
    finalizado: false,
    ciudad: '',
    codPostal: '',
    direccion: '',
    provincia: { nombre: '' },
    pais: { nombre: '' },
    empresa: '',
    fechaAlta: new Date(),
    colectivo: { nombre: '' },
    subcolectivo: { nombre: '', colectivo: { nombre: '' } },
};

export function cargo(state = initialCargoState, action: CargoAction): Cargo {
    switch (action.type) {
        case cargoConstants.SET_TRATAMIENTO:
            return {
                ...state,
                persona: {
                    ...state.persona,
                    tratamiento: action.payload as Tratamiento,
                }
            }
        case cargoConstants.SET_PAIS:
            return {
                ...state,
                pais: action.payload as Pais,
            }
         case cargoConstants.SET_COLECTIVO:
            return {
                ...state,
                colectivo: action.payload as Colectivo,
            }
        case cargoConstants.SET_SUBCOLECTIVO:
            return {
                ...state,
                subcolectivo: action.payload as SubColectivo,
            }
        case cargoConstants.SET_PROVINCIA:
            return {
                ...state,
                provincia: action.payload as Provincia,
            }
        case cargoConstants.SET_PERSONA_NOMBRE:
            return {
                ...state,
                persona: {
                    ...state.persona,
                    nombre: action.payload as string,
                } 
            }
        case cargoConstants.SET_PERSONA_APELLIDOS:
            return {
                ...state,
                persona: {
                    ...state.persona,
                    apellidos: action.payload as string,
                } 
            }
        case cargoConstants.SET_CARGO:
            return {
                ...state,
                cargo: action.payload as string,
            }
        case cargoConstants.SET_EMPRESA:
            return {
                ...state,
                empresa: action.payload as string,
            }
        case cargoConstants.SET_CIUDAD:
            return {
                ...state,
                ciudad: action.payload as string,
            }
        case cargoConstants.SET_DIRECCION:
            return {
                ...state,
                direccion: action.payload as string,
            }
        case cargoConstants.SET_FINALIZADO:
            return {
                ...state,
                finalizado: action.payload as boolean,
            }
        default:
            return state
    }

}