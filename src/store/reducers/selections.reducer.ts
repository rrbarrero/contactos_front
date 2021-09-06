import { selectionsConstants } from "../constants";

type SelectionReducerType = {
    cargos: number[],
    colectivos: number[];
    pais: number;
}

const initialState: SelectionReducerType = {
    cargos: [],
    colectivos: [],
    pais: 0,
};


export function selectionReducer(state = initialState, action: { type: string; payload: number | number[]; }): SelectionReducerType {
    switch (action.type) {
        case selectionsConstants.SELECTED_COLECTIVO_SET:
            return {
                ...state,
                colectivos: action.payload as number[],
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