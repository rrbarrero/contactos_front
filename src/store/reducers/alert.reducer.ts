import { alertConstants } from "../constants";

export function alert(state = {type: '', payload:''}, action: AlertAction): AlertAction {
    switch(action.type){
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                payload: action.payload
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                payload: action.payload
            };
        case alertConstants.CLEAR:
            return {
                type: '',
                payload: "",
            };
        default:
            return state
    }
}