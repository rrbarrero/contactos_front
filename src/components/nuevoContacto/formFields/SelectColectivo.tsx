import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargoActions, selectionsActions, subColectivoActions } from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";


const SelectColectivo = (classes: ClassNameMap) => {

    const DEFAULT_SELECTED = 'junta de extremadura';
    const dispatch = useDispatch();

    const colectivos = useSelector((state: RootState) => state.colectivos);
    const selectedColectivo: Colectivo = useSelector((state: RootState) => state.cargo.colectivo);

    useEffect(() => {
        /*
            Refresh state of subColectivos on selectedColectivo change
        */
        dispatch(subColectivoActions.get_subcolectivos(selectedColectivo));
    }, [selectedColectivo, dispatch]);

    useEffect(() => {
        /*
            Fix default selectedColectivo to "junta de extremadura"
        */
        if (colectivos.length > 0) {
            const colectivo = colectivos.find((colectivo) => colectivo.nombre.toLowerCase() === DEFAULT_SELECTED);
            if (colectivo?.id) {
                dispatch(cargoActions.setColectivo(colectivo));
            }
        }
    }, [colectivos, dispatch]);

    const handleChangeColectivo = (e: unknown) => {
        /*
            Set state of selectedColectivo on inputSelect change
        */
        const colectivo: Colectivo | undefined = colectivos.find(co => co.id === e as number);
        if (colectivo?.id) {
            dispatch(cargoActions.setColectivo(colectivo));
        }
    };

    const renderSelectedColectivo = () => {
        return selectedColectivo.nombre;
    }

    return (
        <Grid item md={6} xs={12} className={classes.inputItem}>
            <InputLabel id="colectivo-select-label">Colectivo</InputLabel>
            <Select
                labelId="colectivo-select-label"
                id="colectivo"
                input={<Input />}
                value={selectedColectivo}
                onChange={(e) => handleChangeColectivo(e.target.value)}
                renderValue={renderSelectedColectivo}
                defaultValue={selectedColectivo}
            >
                {colectivos.map((colectivo) =>
                    <MenuItem key={colectivo.id} value={colectivo.id}>
                        {colectivo.nombre}
                    </MenuItem>
                )}
            </Select>
        </Grid>
    )
}

export default SelectColectivo;