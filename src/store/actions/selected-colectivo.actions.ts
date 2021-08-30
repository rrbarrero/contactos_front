import { selectedColectivoConstants } from "../constants"

export const selectedColectivoActions = {
    set,
}


export function set(id: number) {
    return {
        type: selectedColectivoConstants.SELECTED_COLECTIVO_SET,
        payload: id,
    }
}