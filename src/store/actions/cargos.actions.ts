import { cargoService, userService } from "../../services";
import { cargosConstants } from "../constants";
import { alertActions, spinnerActions } from '.';
import { history } from "../../helpers";
import { userActions } from "./user.actions";

export const cargosActions = {
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
            (cargos: Cargos) => {
                dispatch(spinnerActions.toggleState(false));
                dispatch(success(cargos));
            },
            error => {
                const refreshNeeded = 'No such user or token expired. Login again please.';
                if (error.response?.data?.detail === refreshNeeded) {
                    dispatch(alertActions.error("Sesión caducada. Abra sesión de nuevo."));
                    localStorage.removeItem('user');
                    history.push("/login");
                } else {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            }
        );
    };
    function request(payload: number[]) { return { type: cargosConstants.CARGO_GET_ALL, payload } }
    function success(payload: Cargos) { return { type: cargosConstants.CARGO_SUCCESS, payload } }
    function failure(payload: string) { return { type: cargosConstants.CARGO_ERROR, payload } }
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
    function request(payload: string) { return { type: cargosConstants.CARGO_GET_PAGE, payload } }
    function success(payload: Cargos) { return { type: cargosConstants.CARGO_SUCCESS, payload } }
    function failure(payload: string) { return { type: cargosConstants.CARGO_ERROR, payload } }
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
    function request(payload: string) { return { type: cargosConstants.CARGO_SEARCH, payload } }
    function success(payload: Cargos) { return { type: cargosConstants.CARGO_SUCCESS, payload } }
    function failure(payload: string) { return { type: cargosConstants.CARGO_ERROR, payload } }
}