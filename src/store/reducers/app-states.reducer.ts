import { appStatesConstants } from "../constants";

type SelectionReducerType = {
    selectedCargos: number[];
    selectedColectivos: number[];
    selectedColectivo: Colectivo;
    stepperCurrent: number;
}

const initialState: SelectionReducerType = {
    selectedCargos: [],
    selectedColectivos: [],
    selectedColectivo: { nombre: '' },
    stepperCurrent: 0,
};


type ActionType = {
    type: string;
    payload: number | number[] | Colectivo;
};

export function appStates(state = initialState, action: ActionType): SelectionReducerType {
    switch (action.type) {
        case appStatesConstants.SET_SELECTED_COLECTIVOS:
            return {
                ...state,
                selectedColectivos: action.payload as number[],
            }
        case appStatesConstants.SET_SELECTED_COLECTIVO:
            return {
                ...state,
                selectedColectivo: action.payload as Colectivo,
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