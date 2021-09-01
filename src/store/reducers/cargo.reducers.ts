import { cargoConstants } from "../constants";


let initialState: Cargos = {
    rows: [],
    nextPage: '',
    prevPage: '',
    count: 0,
    currentPage: 0,
};

export function cargos(state = initialState, action: CargoAction): Cargos {
    switch (action.type) {
        case cargoConstants.CARGO_GET_ALL:
            return state;
        case cargoConstants.CARGO_SUCCESS:
            return action.payload;
        case cargoConstants.CARGO_GET_PAGE:
            return state;
        default:
            return state
    }

}