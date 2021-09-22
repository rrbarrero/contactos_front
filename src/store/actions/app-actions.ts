import { appStatesConstants } from "../constants"

export const appActions = {
    setSelectedColectivos,
    setSelectedColectivo,
    setSelectedCargos,
    stepperSet,
}

export function setSelectedColectivos(id: number) {
    return {
        type: appStatesConstants.SET_SELECTED_COLECTIVOS,
        payload: id,
    }
}

export function setSelectedColectivo(colectivo: Colectivo) {
    return {
        type: appStatesConstants.SET_SELECTED_COLECTIVO,
        payload: colectivo,
    }
}

export function setSelectedCargos(ids: number[]) {
    return {
        type: appStatesConstants.SET_SELECTED_CARGOS,
        payload: ids,
    }
}

export function stepperSet(currentStep: number) {
    return {
        type: appStatesConstants.SET_STEPPER_CURRENT,
        payload: currentStep,
    }
}