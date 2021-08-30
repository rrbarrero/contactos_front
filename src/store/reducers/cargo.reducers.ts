import { cargoConstants } from "../constants";


let initialState: Cargos = [];

export function cargos(state = initialState, action: CargoAction): Cargos {
    switch (action.type) {
        case cargoConstants.CARGO_GET_ALL:
            return action.payload;
        default:
            return state
    }

}