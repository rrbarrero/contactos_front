import { paisConstants } from "../constants";

let initialState: Paises = [];

type PaisAction = {
    type: string;
    payload: Paises;
}

export function paises(state = initialState, action: PaisAction): Paises {
    switch (action.type) {
        case paisConstants.PAIS_GET_ALL:
            return state;
        case paisConstants.PAIS_SUCCESS:
            return action.payload;
        default:
            return state
    }

}