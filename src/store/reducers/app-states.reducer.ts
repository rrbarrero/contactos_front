import { appStatesConstants } from "../constants";

type SelectionReducerType = {
    cargos: number[];
    multiColectivos: number[];
    stepperCurrent: number;
}

const initialState: SelectionReducerType = {
    cargos: [],
    multiColectivos: [],
    stepperCurrent: 0,
};


export function appStates(state = initialState, action: { type: string; payload: number | number[]; }): SelectionReducerType {
    switch (action.type) {
        case appStatesConstants.SET_MULTI_COLECTIVO:
            return {
                ...state,
                multiColectivos: action.payload as number[],
            }
        case appStatesConstants.SET_CARGO:
            return {
                ...state,
                cargos: action.payload as number[],
            }
        case appStatesConstants.SET_STEPPER_CURRENT:
            return {
                ...state,
                stepperCurrent: action.payload as number,
            }
        default:
            return state
    }
}