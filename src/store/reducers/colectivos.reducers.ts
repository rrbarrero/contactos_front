import { colectivoConstants } from "../constants";
import { colectivoActions } from "../actions/colectivo.actions";


let initialState: Colectivo | null = null;

export function colectivo(state = initialState, action: ColectivoAction): (Colectivo | Colectivo[] | null) {
    switch (action.type) {
        case colectivoConstants.COLECTIVO_GET_ONE:
            return {
                id: action.colectivo?.id,
                nombre: action.colectivo?.nombre,
            }
        default:
            return state
    }

}