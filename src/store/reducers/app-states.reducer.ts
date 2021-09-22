import { appStatesConstants } from "../constants";

type SelectionReducerType = {
    selectedCargos: number[];
    selectedColectivos: number[];
    selectedColectivo: Colectivo;
    stepperCurrent: number;
    appTitle: string;
}

const initialState: SelectionReducerType = {
    selectedCargos: [],
    selectedColectivos: [],
    selectedColectivo: { nombre: '' },
    stepperCurrent: 0,
    appTitle: 'Contactos',
};


type ActionType = {
    type: string;
    payload: number | number[] | Colectivo | string;
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
        case appStatesConstants.SET_APP_TITLE:
            return {
                ...state,
                appTitle: action.payload as string,
            }
        default:
            return state
    }
}