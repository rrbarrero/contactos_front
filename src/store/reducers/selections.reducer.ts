import { selectionsConstants } from "../constants";

type SelectionReducerType = {
    cargos: number[];
    multi_colectivos: number[];
    single_colectivo: number;
    pais: number;
}

const initialState: SelectionReducerType = {
    cargos: [],
    multi_colectivos: [],
    single_colectivo: 0,
    pais: 0,
};


export function selectionReducer(state = initialState, action: { type: string; payload: number | number[]; }): SelectionReducerType {
    switch (action.type) {
        case selectionsConstants.SET_MULTI_COLECTIVO:
            return {
                ...state,
                multi_colectivos: action.payload as number[],
            }
        case selectionsConstants.SET_SINGLE_COLECTIVO:
            return {
                ...state,
                single_colectivo: action.payload as number,
            }
        case selectionsConstants.SELECTED_PAIS_SET:
            return {
                ...state,
                pais: action.payload as number,
            }
        case selectionsConstants.SELECTED_CARGO_SET:
            return {
                ...state,
                cargos: action.payload as number[],
            }
        default:
            return state
    }
}