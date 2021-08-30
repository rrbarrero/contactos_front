import { selectedColectivoConstants } from "../constants";

const initialState: number[] = [];


export function selectedColectivo(state = initialState, action: SelectedColectivoAction): number[] {
    switch (action.type) {
        case selectedColectivoConstants.SELECTED_COLECTIVO_SET:
            return action.payload;

        default:
            return state
    }
}