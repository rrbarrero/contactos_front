import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    clear
};


function success(message: string) {
    return { type: alertConstants.SUCCESS, payload: message };
}

function error(message: string) {
    return { type: alertConstants.ERROR, payload: message };
}

function clear() {
    return { type: alertConstants.CLEAR, payload: '' };
}