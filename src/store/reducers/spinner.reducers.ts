import { spinnerConstants } from "../constants";

const initialState: boolean = false;


export function Spinner(state = initialState, action: SpinnerAction): boolean {
    switch (action.type) {
        case spinnerConstants.TOGGLE_SPINNER:
            return action.payload;

        default:
            return state
    }
}