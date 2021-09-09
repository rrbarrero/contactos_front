import { cargoConstants } from "../constants";


let initialState: Cargo = {
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
    provincia: { nombre: 'España' },
    pais: { nombre: '' },
    empresa: '',
    fechaAlta: new Date(),
    colectivo: { nombre: '' },
    subcolectivo: { nombre: '', colectivo: { nombre: '' } },
};

export function cargo(state = initialState, action: CargoAction): Cargo {
    switch (action.type) {
        case cargoConstants.SET_TRATAMIENTO:
            return {
                ...state,
                persona: {
                    ...state.persona,
                    tratamiento: action.payload as Tratamiento,
                }
                
            }
        default:
            return state
    }

}
