import { appStatesConstants } from "../constants"

export const appActions = {
    colectivoMultiSet,
    cargoSet,
    stepperSet,
}

export function colectivoMultiSet(id: number) {
    return {
        type: appStatesConstants.SET_MULTI_COLECTIVO,
        payload: id,
    }
}

export function cargoSet(ids: number[]) {
    return {
        type: appStatesConstants.SET_CARGO,
        payload: ids,
    }
}

export function stepperSet(currentStep: number) {
    return {
        type: appStatesConstants.SET_STEPPER_CURRENT,
        payload: currentStep,
    }
}