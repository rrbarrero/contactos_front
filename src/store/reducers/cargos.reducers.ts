import { cargosConstants } from "../constants";


let initialState: Cargos = {
    rows: [],
    nextPage: '',
    prevPage: '',
    count: 0,
    currentPage: 0,
};

export function cargos(state = initialState, action: CargosAction): Cargos {
    switch (action.type) {
        case cargosConstants.CARGO_GET_ALL:
            return state;
        case cargosConstants.CARGO_SUCCESS:
            return action.payload;
        case cargosConstants.CARGO_GET_PAGE:
            return state;
        default:
            return state
    }

}