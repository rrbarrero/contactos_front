import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import { cargoActions } from "../../../store/actions/";
import { ClassNameMap } from '@material-ui/core/styles/withStyles';


const SelectTratamiento = (classes: ClassNameMap) => {

    const DEFAULT_SELECTED = 'sr. d.';
    const dispatch = useDispatch();
    const tratamientos = useSelector((state: RootState) => state.tratamientos);
    const selectedTratamiento = useSelector((state: RootState) => state.cargo.persona.tratamiento);

    useEffect(() => {
        /*
            Fix default selectedTratamiento to "Sr. D."
        */
        if (tratamientos.length > 0) {
            const tratamiento = tratamientos.find((tr) => tr.nombre.toLowerCase() === DEFAULT_SELECTED);
            if (tratamiento) {
                dispatch(cargoActions.setTratamiento(tratamiento));
            }
        }
    }, [dispatch, tratamientos]);

    const handleChangeTratamiento = (e: unknown) => {
        const tratamiento: Tratamiento | undefined = tratamientos.find(tr => tr.id === e as number);
        if (tratamiento) {
            dispatch(cargoActions.setTratamiento(tratamiento));
        }
    };

    const renderSelectedTratamiento = () => {
        return selectedTratamiento.nombre;
    }

    return (

        <Grid item md={3} xs={12} className={classes.inputItem}>
            <InputLabel id="tratamiento-select-label">Tratamiento</InputLabel>
            <Select
                labelId="tratamiento-select-label"
                id="tratamiento"
                input={<Input />}
                value={selectedTratamiento}
                onChange={(e) => handleChangeTratamiento(e.target.value)}
                renderValue={renderSelectedTratamiento}
            >
                {tratamientos.map((tratamiento) =>
                    <MenuItem key={tratamiento.id} value={tratamiento.id}>
                        {tratamiento.nombre}
                    </MenuItem>
                )}
            </Select>
        </Grid>
    );

}

export default SelectTratamiento;