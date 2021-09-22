import { correosConstants } from "../constants";

type CorreoAction = {
    type: string;
    payload: Correo;
}

let initialState: Correo[] = [];

export function correos(state = initialState, action: CorreoAction): Correo[] {
    switch (action.type) {
        case correosConstants.ADD_CORREO:
            return [...state, action.payload]
        default:
            return state
    }
}