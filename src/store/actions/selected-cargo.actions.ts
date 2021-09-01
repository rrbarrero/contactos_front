import { selectedCargoConstants } from "../constants"

export const selectedCargoActions = {
    cargoSet,
}


export function cargoSet(ids: number[]) {
    return {
        type: selectedCargoConstants.SELECTED_CARGO_SET,
        payload: ids,
    }
}