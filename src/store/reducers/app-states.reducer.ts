import { appStatesConstants } from "../constants";

type SelectionReducerType = {
    selectedCargos: number[];
    selectedColectivos: number[];
    stepperCurrent: number;
}

const initialState: SelectionReducerType = {
    selectedCargos: [],
    selectedColectivos: [],
    stepperCurrent: 0,
};


export function appStates(state = initialState, action: { type: string; payload: number | number[]; }): SelectionReducerType {
    switch (action.type) {
        case appStatesConstants.SET_SELECTED_COLECTIVOS:
            return {
                ...state,
                selectedColectivos: action.payload as number[],
            }
        case appStatesConstants.SET_SELECTED_CARGOS:
            return {
                ...state,
                selectedCargos: action.payload as number[],
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