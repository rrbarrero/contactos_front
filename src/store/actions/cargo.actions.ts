import { cargoService } from "../../services";
import { cargoConstants } from "../constants";
import { history } from '../../helpers';
import { alertActions } from '.';

export const cargoActions = {
    get_all,
}

type DispatchType = {
    type: string,
    user?: string,
    error?: string,
    message?: string,
}

export function get_all(colectivoSelected: number[]) {

    return (dispatch: (arg0: DispatchType) => void) => {
        cargoService.get_all(colectivoSelected).then(
            cargos => {
                dispatch(request(cargos))
                dispatch(success(cargos));
                //history.push('/');
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request(payload: Cargos) { return { type: cargoConstants.CARGO_GET_ALL, payload } }
    function success(payload: Cargos) { return { type: cargoConstants.CARGO_SUCCESS, payload } }
    function failure(payload: string) { return { type: cargoConstants.CARGO_ERROR, payload } }
}