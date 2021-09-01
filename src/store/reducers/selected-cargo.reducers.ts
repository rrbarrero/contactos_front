import { selectedCargoConstants } from "../constants";

const initialState: number[] = [];


export function selectedCargo(state = initialState, action: SelectedCargoAction): number[] {
    switch (action.type) {
        case selectedCargoConstants.SELECTED_CARGO_SET:
            return action.payload;

        default:
            return state
    }
}