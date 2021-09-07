import { selectionsConstants } from "../constants"

export const selectionsActions = {
    tratamientoSet,
    paisSet,
    colectivoMultiSet,
    colectivoSingleSet,
    subColectivoSet,
    cargoSet,
}

export function tratamientoSet(id: number) {
    return {
        type: selectionsConstants.SET_TRATAMIENTO,
        payload: id,
    }
}

export function paisSet(id: number) {
    return {
        type: selectionsConstants.SET_PAIS,
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

export function subColectivoSet(id: number) {
    return {
        type: selectionsConstants.SET_SUBCOLECTIVO,
        payload: id,
    }
}

export function cargoSet(ids: number[]) {
    return {
        type: selectionsConstants.SET_CARGO,
        payload: ids,
    }
}