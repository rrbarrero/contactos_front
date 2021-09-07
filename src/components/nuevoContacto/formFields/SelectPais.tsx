import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paisActions, selectionsActions } from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";

type InputType = {
    values: Pais,
    classStyle: string,
}

const SelectPais =  ({values, classStyle}: InputType) => {

    const DEFAULT_SELECTED = 'españa';

    const dispatch = useDispatch();
    const paises = useSelector((state: RootState) => state.paises);
    const selectedPais = useSelector((state: RootState) => state.selectionReducer.pais);

    useEffect(() => {
        /*
            Load all paises;
        */
        dispatch(paisActions.get_all_paises());
    }, [dispatch]);

    useEffect(() => {
        /*
            Fix default país to "españa"
        */
        if (paises.length > 0) {
            const defaultPais = paises.find((pais) => pais.nombre.toLowerCase() === DEFAULT_SELECTED);
            if (defaultPais?.id) {
                dispatch(selectionsActions.paisSet(defaultPais.id));
            }
        }
    }, [dispatch, paises]);

    const handleChangePais = (e: unknown) => {
        /*
            Set state of selectedPais on inputSelect change
        */
        const pais = paises.find(pa => pa.id === e as number);
        if (pais?.id) {
            dispatch(selectionsActions.paisSet(pais.id));
        }
    };

    const renderSelectedPais = () => {
        const currentPais: Pais | undefined = paises.find((pais) => pais.id === selectedPais);
        if (currentPais) {
            return currentPais.nombre;
        }
    }

    return (

        <Grid item md={6} xs={12} className={classStyle}>
            <InputLabel id="pais-select-label">Pais</InputLabel>
            {selectedPais && <Select
                labelId="pais-select-label"
                id="pais"
                input={<Input />}
                value={values.id}
                onChange={(e) => handleChangePais(e.target.value)}
                renderValue={renderSelectedPais}
                defaultValue={selectedPais}
            >
                {paises.map((pais) =>
                    <MenuItem key={pais.id} value={pais.id}>
                        {pais.nombre}
                    </MenuItem>
                )}
            </Select>}
        </Grid>
    );
}

export default SelectPais;