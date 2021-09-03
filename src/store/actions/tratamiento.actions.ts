import { tratamientoService } from "../../services";
import { tratamientoConstants } from "../constants";
import { alertActions } from './';

export const tratamientoActions = {
    get_all_tratamientos,
}

type DispatchType = {
    type: string,
    user?: string,
    error?: string,
    message?: string,
}


export function get_all_tratamientos() {

    return (dispatch: (arg0: DispatchType) => void) => {
        dispatch(request());
        tratamientoService.get_all().then(
            tratamientos => {
                dispatch(success(tratamientos));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() { return { type: tratamientoConstants.TRATAMIENTO_GET_ALL } }
    function success(payload: Tratamientos) { return { type: tratamientoConstants.TRATAMIENTO_SUCCESS, payload } }
    function failure(payload: string) { return { type: tratamientoConstants.TRATAMIENTO_ERROR, payload } }
}