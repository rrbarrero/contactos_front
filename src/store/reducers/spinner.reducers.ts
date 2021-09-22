import { spinnerConstants } from "../constants";

const initialState: boolean = false;


type SpinnerAction = {
    type: string;
    payload: boolean;
}


export function Spinner(state = initialState, action: SpinnerAction): boolean {
    switch (action.type) {
        case spinnerConstants.TOGGLE_SPINNER:
            return action.payload;

        default:
            return state
    }
}