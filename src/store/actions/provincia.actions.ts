import { provinciaService } from "../../services";
import { provinciaConstants } from "../constants";
import { alertActions } from './';

export const provinciaActions = {
    get_all_provincias,
}

type DispatchType = {
    type: string,
    user?: string,
    error?: string,
    message?: string,
}


export function get_all_provincias() {

    return (dispatch: (arg0: DispatchType) => void) => {
        dispatch(request());
        provinciaService.get_all().then(
            provincias => {
                dispatch(success(provincias));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() { return { type: provinciaConstants.PROVINCIA_GET_ALL } }
    function success(payload: Provincias) { return { type: provinciaConstants.PROVINCIA_SUCCESS, payload } }
    function failure(payload: string) { return { type: provinciaConstants.PROVINCIA_ERROR, payload } }
}