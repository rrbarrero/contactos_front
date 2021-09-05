import { paisService } from "../../services";
import { paisConstants } from "../constants";
import { alertActions } from './';

export const paisActions = {
    get_all_paises,
}

type DispatchType = {
    type: string,
    user?: string,
    error?: string,
    message?: string,
}


export function get_all_paises() {

    return (dispatch: (arg0: DispatchType) => void) => {
        dispatch(request());
        paisService.get_all().then(
            paises => {
                dispatch(success(paises));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() { return { type: paisConstants.PAIS_GET_ALL } }
    function success(payload: Paises) { return { type: paisConstants.PAIS_SUCCESS, payload } }
    function failure(payload: string) { return { type: paisConstants.PAIS_ERROR, payload } }
}