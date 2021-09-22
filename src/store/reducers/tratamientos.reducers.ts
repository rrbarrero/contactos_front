import { tratamientoConstants } from "../constants";

let initialState: Tratamientos = [];

type TratamientoAction = {
    type: string;
    payload: Tratamientos;
}

export function tratamientos(state = initialState, action: TratamientoAction): Tratamientos {
    switch (action.type) {
        case tratamientoConstants.TRATAMIENTO_GET_ALL:
            return state;
        case tratamientoConstants.TRATAMIENTO_SUCCESS:
            return action.payload;
        default:
            return state
    }

}