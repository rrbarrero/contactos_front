import { colectivoConstants } from "../constants";


let initialState: Colectivos = [];

export function colectivos(state = initialState, action: ColectivoAction): Colectivos {
    switch (action.type) {
        case colectivoConstants.COLECTIVO_GET_ONE:
            return [{
                id: action.payload[0].id,
                nombre: action.payload[0].nombre,
            }]
        case colectivoConstants.COLECTIVO_GET_ALL:
            return state;
        case colectivoConstants.COLECTIVO_SUCCESS:
            return action.payload;
        default:
            return state
    }

}