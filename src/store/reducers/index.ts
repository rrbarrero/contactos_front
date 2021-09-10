import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { cargo } from './cargo.reducers';
import { cargos } from './cargos.reducers';
import { colectivos } from './colectivos.reducer';
import { searchContacto } from './search-contacto.reducers';
import { Spinner } from './spinner.reducers';
import { tratamientos } from './tratamientos.reducers';
import { provincias } from './provincia.reducers';
import { paises } from './pais.reducers';
import { subColectivos } from './subcolectivos.reducers';
import { appStates } from './app-states.reducer';

const rootReducer = combineReducers({
    authentication,
    colectivos,
    searchContacto,
    cargo,
    cargos,
    Spinner,
    alert,
    tratamientos,
    provincias,
    paises,
    subColectivos,
    appStates,

});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

