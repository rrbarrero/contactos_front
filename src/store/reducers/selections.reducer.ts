import { selectionsConstants } from "../constants";

type SelectionReducerType = {
    tratamiento: number;
    cargos: number[];
    multiColectivos: number[];
    singleColectivo: number;
    subColectivo: number;
    pais: number;
    stepperCurrent: number;
}

const initialState: SelectionReducerType = {
    tratamiento: 0,
    cargos: [],
    multiColectivos: [],
    singleColectivo: 0,
    subColectivo: 0,
    pais: 0,
    stepperCurrent: 0,
};


export function selectionReducer(state = initialState, action: { type: string; payload: number | number[]; }): SelectionReducerType {
    switch (action.type) {
        case selectionsConstants.SET_TRATAMIENTO:
            return {
                ...state,
                tratamiento: action.payload as number,
            }
        case selectionsConstants.SET_MULTI_COLECTIVO:
            return {
                ...state,
                multiColectivos: action.payload as number[],
            }
        case selectionsConstants.SET_SINGLE_COLECTIVO:
            return {
                ...state,
                singleColectivo: action.payload as number,
            }
        case selectionsConstants.SET_SUBCOLECTIVO:
                return {
                    ...state,
                    subColectivo: action.payload as number,
                }
        case selectionsConstants.SET_PAIS:
            return {
                ...state,
                pais: action.payload as number,
            }
        case selectionsConstants.SET_CARGO:
            return {
                ...state,
                cargos: action.payload as number[],
            }
        case selectionsConstants.SET_STEPPER_CURRENT:
            return {
                ...state,
                stepperCurrent: action.payload as number,
            }
        default:
            return state
    }
}