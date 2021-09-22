import { customDialogConstants } from "../constants";

type dialogAction = {
    type: string;
    payload: CustomDialog | boolean;
}

let initialState: CustomDialog = {
    title: '',
    body: '',
    status: false,
    onAccept: () => { },
    onCancel: () => { },
};

export function customDialog(state = initialState, action: dialogAction): CustomDialog {
    switch (action.type) {
        case customDialogConstants.SET_DATA:
            return action.payload as CustomDialog;
        case customDialogConstants.TOGGLE_STATE:
            return {
                ...state,
                status: !state.status,
            }
        default:
            return state
    }
}