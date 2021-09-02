import { spinnerConstants } from "../constants"

export const spinnerActions = {
    toggleState,
}


export function toggleState(spinnerState: boolean) {
    return {
        type: spinnerConstants.TOGGLE_SPINNER,
        payload: spinnerState,
    }
}