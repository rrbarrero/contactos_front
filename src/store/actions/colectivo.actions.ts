import { colectivoService } from "../../services";
import { colectivoConstants } from "../constants";
import { history } from '../../helpers';
import { alertActions } from './';

export const colectivoActions = {
    get_one,
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
            colectivo => {
                dispatch(success(colectivo));
                history.push('/');
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request(id: number) { return { type: colectivoConstants.COLECTIVO_GET_ONE, id } }
    function success(user: string) { return { type: colectivoConstants.COLECTIVO_SUCCESS, id } }
    function failure(error: string) { return { type: colectivoConstants.COLECTIVO_ERROR, error } }
}