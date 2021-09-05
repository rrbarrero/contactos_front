import { subColectivoService } from "../../services";
import { subColectivoConstants } from "../constants";
import { alertActions } from './';

export const subColectivoActions = {
    get_subcolectivos,
}

type DispatchType = {
    type: string,
    user?: string,
    error?: string,
    message?: string,
}

export function get_subcolectivos(colectivo: Colectivo) {

    return (dispatch: (arg0: DispatchType) => void) => {
        dispatch(request(colectivo));
        subColectivoService.get_subcolectivos(colectivo).then(
            subcolectivos => {
                dispatch(success(subcolectivos));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request(colectivo: Colectivo) { return { type: subColectivoConstants.SUBCOLECTIVO_GET_FROM_COLECTIVO, payload: colectivo } }
    function success(subcolectivos: SubColectivos) { return { type: subColectivoConstants.SUBCOLECTIVO_SUCCESS, payload: subcolectivos } }
    function failure(error: string) { return { type: subColectivoConstants.SUBCOLECTIVO_ERROR, payload: error } }
}
