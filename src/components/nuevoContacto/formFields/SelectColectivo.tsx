import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions, subColectivoActions } from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

type SelectArgs = {
    classes: ClassNameMap,
    cargoValues: Cargo,
}

const SelectColectivo = (selectArgs: SelectArgs) => {

    const { classes, cargoValues } = selectArgs;
    const DEFAULT_SELECTED = 'junta de extremadura';
    const dispatch = useDispatch();

    const colectivos = useSelector((state: RootState) => state.colectivos);
    const selectedColectivo: Colectivo = useSelector((state: RootState) => state.appStates.selectedColectivo);

    useEffect(() => {
        /*
            Refresh state of subColectivos on selectedColectivo change
        */
        if (selectedColectivo.id) {
            dispatch(subColectivoActions.get_subcolectivos(selectedColectivo));
        }

    }, [selectedColectivo, dispatch]);

    useEffect(() => {
        /*
            Fix default selectedColectivo to "junta de extremadura"
        */
        if (colectivos.length > 0 && selectedColectivo.nombre === '') {
            const colectivo = colectivos.find((colectivo) => colectivo.nombre.toLowerCase() === DEFAULT_SELECTED);
            if (colectivo?.id) {
                dispatch(appActions.setSelectedColectivo(colectivo));
                cargoValues.colectivo = colectivo;
            }
        }
    }, [cargoValues, colectivos, dispatch, selectedColectivo.nombre]);

    const handleChangeColectivo = (e: unknown) => {
        /*
            Set state of selectedColectivo on inputSelect change
        */
        const colectivo: Colectivo | undefined = colectivos.find(co => co.id === e as number);
        if (colectivo?.id) {
            dispatch(appActions.setSelectedColectivo(colectivo));
            cargoValues.colectivo = colectivo;
        }
    };

    const renderSelectedColectivo = () => {
        return selectedColectivo.nombre;
    }

    return (
        <Grid item md={6} xs={12} className={classes.inputItem} id="colectivo">
            <InputLabel id="colectivo-select-label">Colectivo</InputLabel>
            {selectedColectivo.id && <Select
                labelId="colectivo-select-label"
                input={<Input />}
                value={selectedColectivo.id ? selectedColectivo.id : 1}
                onChange={(e) => handleChangeColectivo(e.target.value)}
                renderValue={renderSelectedColectivo}
            >
                {colectivos.map((colectivo) =>
                    <MenuItem key={colectivo.id} value={colectivo.id}>
                        {colectivo.nombre}
                    </MenuItem>
                )}
            </Select>}
        </Grid>
    )
}

export default SelectColectivo;