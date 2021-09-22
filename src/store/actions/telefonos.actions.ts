import { telefonosConstants } from "../constants";

export const telefonosActions = {
    addTelefono,
}

export function addTelefono(telefono: Telefono) {
    return {
        type: telefonosConstants.ADD_TELEFONO,
        payload: telefono,
    }
}
