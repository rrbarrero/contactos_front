import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { colectivo } from './colectivos.reducers';

const rootReducer = combineReducers({
    authentication,
    colectivo,
    alert,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
