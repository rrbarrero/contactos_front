import { selectionsConstants } from "../constants"

export const selectionsActions = {
    paisSet,
    colectivoMultiSet,
    colectivoSingleSet,
    cargoSet,
}


export function paisSet(id: number) {
    return {
        type: selectionsConstants.SELECTED_PAIS_SET,
        payload: id,
    }
}

export function colectivoMultiSet(id: number) {
    return {
        type: selectionsConstants.SET_MULTI_COLECTIVO,
        payload: id,
    }
}

export function colectivoSingleSet(id: number) {
    return {
        type: selectionsConstants.SET_SINGLE_COLECTIVO,
        payload: id,
    }
}

export function cargoSet(ids: number[]) {
    return {
        type: selectionsConstants.SELECTED_CARGO_SET,
        payload: ids,
    }
}