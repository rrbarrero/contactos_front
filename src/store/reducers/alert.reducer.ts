import { alertConstants } from "../constants";

export function alert(state = {type: '', message:''}, action: AlertAction): AlertAction {
    switch(action.type){
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {
                type: '',
                message: "",
            };
        default:
            return state
    }
}