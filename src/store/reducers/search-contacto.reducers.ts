import { searchContactoConstants } from "../constants";

const initialState: string = '';

type searchContactoAction = {
    type: string;
    payload: string;
}

export function searchContacto(state = initialState, action: searchContactoAction): string {
    switch (action.type) {
        case searchContactoConstants.SEARCH_CONTACTO_SET:
            return action.payload;

        default:
            return state
    }
}