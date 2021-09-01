import { selectedColectivoConstants } from "../constants"

export const selectedColectivoActions = {
    colectivoSet,
}


export function colectivoSet(id: number) {
    return {
        type: selectedColectivoConstants.SELECTED_COLECTIVO_SET,
        payload: id,
    }
}