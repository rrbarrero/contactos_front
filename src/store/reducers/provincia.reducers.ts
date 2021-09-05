import { provinciaConstants } from "../constants";


let initialState: Provincias = [];

export function provincias(state = initialState, action: ProvinciaAction): Provincias {
    switch (action.type) {
        case provinciaConstants.PROVINCIA_GET_ALL:
            return state;
        case provinciaConstants.PROVINCIA_SUCCESS:
            return action.payload;
        default:
            return state
    }

}