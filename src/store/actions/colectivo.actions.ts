import { colectivoService } from "../../services";
import { colectivoConstants } from "../constants";
import { history } from '../../helpers';
import { alertActions } from './';

export const colectivoActions = {
    get_one,
    get_all_colectivos,
}

type DispatchType = {
    type: string,
    user?: string,
    error?: string,
    message?: string,
}

export function get_one(id: number) {

    return (dispatch: (arg0: DispatchType) => void) => {
        dispatch(request(id));
        colectivoService.get_one(id).then(
            colectivos => {
                dispatch(success(id.toString()));
                history.push('/');
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request(id: number) { return { type: colectivoConstants.COLECTIVO_GET_ONE, payload: id } }
    function success(id: string) { return { type: colectivoConstants.COLECTIVO_SUCCESS, payload: id } }
    function failure(error: string) { return { type: colectivoConstants.COLECTIVO_ERROR, payload: error } }
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