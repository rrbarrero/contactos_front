import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { cargos } from './cargo.reducers';
import { colectivos } from './colectivos.reducer';
import { selectedCargo } from './selected-cargo.reducers';
import { searchContacto } from './search-contacto.reducers';
import { Spinner } from './spinner.reducers';
import { tratamientos } from './tratamientos.reducers';
import { provincias } from './provincia.reducers';
import { paises } from './pais.reducers';
import { subColectivos } from './subcolectivos.reducers';
import { selectionReducer } from './selections.reducer';

const rootReducer = combineReducers({
    authentication,
    colectivos,
    selectedCargo,
    searchContacto,
    cargos,
    Spinner,
    alert,
    tratamientos,
    provincias,
    paises,
    subColectivos,
    selectionReducer,

});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

