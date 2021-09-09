import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargoActions, paisActions } from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

const SelectPais = (classes: ClassNameMap) => {

    const DEFAULT_SELECTED = 'españa';

    const dispatch = useDispatch();
    const paises = useSelector((state: RootState) => state.paises);
    const selectedPais = useSelector((state: RootState) => state.cargo.pais);

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
            if (defaultPais) {
                dispatch(cargoActions.setPais(defaultPais));
            }
        }
    }, [dispatch, paises]);

    const handleChangePais = (e: unknown) => {
        /*
            Set state of selectedPais on inputSelect change
        */
        const pais = paises.find(pa => pa.id === e as number);
        if (pais) {
            dispatch(cargoActions.setPais(pais));
        }
    };

    const renderSelectedPais = () => {
        return selectedPais.nombre;
    }

    return (

        <Grid item md={6} xs={12} className={classes.inputItem}>
            <InputLabel id="pais-select-label">Pais</InputLabel>
            {selectedPais && <Select
                labelId="pais-select-label"
                id="pais"
                input={<Input />}
                value={selectedPais}
                onChange={(e) => handleChangePais(e.target.value)}
                renderValue={renderSelectedPais}
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