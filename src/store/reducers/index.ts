import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers({
    authentication,
    alert,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
