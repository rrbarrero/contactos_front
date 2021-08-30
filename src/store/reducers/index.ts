import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { cargos } from './cargo.reducers';
import { colectivos } from './colectivos.reducer';
import { selectedColectivo } from './selected-colectivo.reducer';

const rootReducer = combineReducers({
    authentication,
    colectivos,
    selectedColectivo,
    cargos,
    alert,
});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

