import { colectivoService } from "../../services";
import { colectivoConstants } from "../constants";
import { alertActions } from './';

export const colectivoActions = {
    get_all_colectivos,
}

type DispatchType = {
    type: string,
    user?: string,
    error?: string,
    message?: string,
}


export function get_all_colectivos() {

    return (dispatch: (arg0: DispatchType) => void) => {
        dispatch(request());
        colectivoService.get_all().then(
            colectivos => {
                dispatch(success(colectivos));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() { return { type: colectivoConstants.COLECTIVO_GET_ALL } }
    function success(payload: Colectivos) { return { type: colectivoConstants.COLECTIVO_SUCCESS, payload} }
    function failure(payload: string) { return { type: colectivoConstants.COLECTIVO_ERROR, payload} }
}