import { cargoService } from "../../services";
import { cargoConstants } from "../constants";
import { history } from '../../helpers';
import { alertActions, spinnerActions } from '.';

export const cargoActions = {
    get_all,
    get_page,
    search,
}

type DispatchType = {
    type: string,
    user?: string,
    error?: string,
    message?: string,
}

export function get_all(colectivoSelected: number[]) {

    return (dispatch: (arg0: DispatchType) => void) => {
        dispatch(request(colectivoSelected))
        dispatch(spinnerActions.toggleState(true));
        cargoService.get_all(colectivoSelected).then(
            cargos => {
                dispatch(spinnerActions.toggleState(false));
                dispatch(success(cargos));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request(payload: number[]) { return { type: cargoConstants.CARGO_GET_ALL, payload } }
    function success(payload: Cargos) { return { type: cargoConstants.CARGO_SUCCESS, payload } }
    function failure(payload: string) { return { type: cargoConstants.CARGO_ERROR, payload } }
}

export function get_page(url: string, currentPage: number) {
    return (dispatch: (arg0: DispatchType) => void) => {
        dispatch(request(url))
        cargoService.get_page(url, currentPage).then(
            cargos => {
                dispatch(success(cargos));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request(payload: string) { return { type: cargoConstants.CARGO_GET_PAGE, payload } }
    function success(payload: Cargos) { return { type: cargoConstants.CARGO_SUCCESS, payload } }
    function failure(payload: string) { return { type: cargoConstants.CARGO_ERROR, payload } }
}

export function search(needle: string) {
    return (dispatch: (arg0: DispatchType) => void) => {
        dispatch(request(needle))
        dispatch(spinnerActions.toggleState(true));
        cargoService.search(needle).then(
            cargos => {
                dispatch(spinnerActions.toggleState(false));
                dispatch(success(cargos));
            },
            error => {
                dispatch(spinnerActions.toggleState(false));
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request(payload: string) { return { type: cargoConstants.CARGO_SEARCH, payload } }
    function success(payload: Cargos) { return { type: cargoConstants.CARGO_SUCCESS, payload } }
    function failure(payload: string) { return { type: cargoConstants.CARGO_ERROR, payload } }
}