import { correosConstants } from "../constants";

export const correosActions = {
    addCorreo,
}

export function addCorreo(correo: Correo) {
    return {
        type: correosConstants.ADD_CORREO,
        payload: correo,
    }
}
