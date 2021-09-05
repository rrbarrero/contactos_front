import { subColectivoConstants } from "../constants";


let initialState: SubColectivos = [];

export function subColectivos(state = initialState, action: SubColectivoAction): SubColectivos {
    switch (action.type) {
        case subColectivoConstants.SUBCOLECTIVO_GET_FROM_COLECTIVO:
            return state;
        case subColectivoConstants.SUBCOLECTIVO_SUCCESS:
            return action.payload;
        default:
            return state
    }

}