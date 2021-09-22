import { telefonosConstants } from "../constants";

type TelefonoAction = {
    type: string;
    payload: Telefono;
}

let initialState: Telefono[] = [];

export function telefonos(state = initialState, action: TelefonoAction): Telefono[] {
    switch (action.type) {
        case telefonosConstants.ADD_TELEFONO:
            return [...state, action.payload]
        default:
            return state
    }
}