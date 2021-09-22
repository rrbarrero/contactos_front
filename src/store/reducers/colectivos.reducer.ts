import { colectivoConstants } from "../constants";


let initialState: Colectivos = [];

type ColectivoAction = {
    type: string;
    payload: Colectivos;
}

export function colectivos(state = initialState, action: ColectivoAction): Colectivos {
    switch (action.type) {
        case colectivoConstants.COLECTIVO_GET_ALL:
            return state;
        case colectivoConstants.COLECTIVO_SUCCESS:
            return action.payload;
        default:
            return state
    }

}