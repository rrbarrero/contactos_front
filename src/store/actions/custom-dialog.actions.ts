import { customDialogConstants } from "../constants"

export const customDialogActions = {
    setData,
    toggleState,
}

export function setData(customDialogData: CustomDialog) {
    return {
        type: customDialogConstants.SET_DATA,
        payload: customDialogData,
    }
}

export function toggleState() {
    return {
        type: customDialogConstants.TOGGLE_STATE,
        payload: null,
    }
}
