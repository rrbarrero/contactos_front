import { cargoConstants } from "../constants"

export const cargoActions = {
    setTratamiento,
    setPais,
}

export function setTratamiento(tratamiento: Tratamiento) {
    return {
        type: cargoConstants.SET_TRATAMIENTO,
        payload: tratamiento,
    }
}

export function setPais(pais: Pais) {
    return {
        type: cargoConstants.SET_PAIS,
        payload: pais,
    }
}