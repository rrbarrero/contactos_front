import { searchContactoConstants } from "../constants"

export const searchContactoActions = {
    contactoSearchSet,
}


export function contactoSearchSet(needle: string) {
    return {
        type: searchContactoConstants.SEARCH_CONTACTO_SET,
        payload: needle,
    }
}


