import { cargoConstants } from "../constants"

export const cargoActions = {
    setTratamiento
}

export function setTratamiento(tratamiento: Tratamiento) {
    return {
        type: cargoConstants.SET_TRATAMIENTO,
        payload: tratamiento,
    }
}