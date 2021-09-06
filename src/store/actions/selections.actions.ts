import { selectionsConstants } from "../constants"

export const selectionsActions = {
    paisSet,
    colectivoSet,
    cargoSet,
}


export function paisSet(id: number) {
    return {
        type: selectionsConstants.SELECTED_PAIS_SET,
        payload: id,
    }
}

export function colectivoSet(id: number) {
    return {
        type: selectionsConstants.SELECTED_COLECTIVO_SET,
        payload: id,
    }
}

export function cargoSet(ids: number[]) {
    return {
        type: selectionsConstants.SELECTED_CARGO_SET,
        payload: ids,
    }
}