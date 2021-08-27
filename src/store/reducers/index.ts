import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { colectivos } from './colectivos.reducers';

const rootReducer = combineReducers({
    authentication,
    colectivos,
    alert,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
