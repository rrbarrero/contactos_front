import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

type SelectArgs = {
    classes: ClassNameMap,
    cargoValues: Cargo,
}


const SelectTratamiento = (selectArgs: SelectArgs) => {

    const DEFAULT_SELECTED = 'sr. d.';
    const { classes, cargoValues } = selectArgs;
    const dispatch = useDispatch();
    const tratamientos = useSelector((state: RootState) => state.tratamientos);
    const [selectedTratamiento, setSelectedTratamiento] = useState<Tratamiento>(cargoValues.persona.tratamiento);

    useEffect(() => {
        /*
            Fix default selectedTratamiento to "Sr. D."
        */
        if (selectedTratamiento.nombre === '') {
            if (tratamientos.length > 0) {
                const tratamiento = tratamientos.find((tr) => tr.nombre.toLowerCase() === DEFAULT_SELECTED);
                if (tratamiento) {
                    setSelectedTratamiento(tratamiento);
                    cargoValues.persona.tratamiento = tratamiento;
                }
            }
        }

    }, [cargoValues.persona, dispatch, selectedTratamiento.nombre, tratamientos]);

    const handleChangeTratamiento = (e: unknown) => {
        const tratamiento: Tratamiento | undefined = tratamientos.find(tr => tr.id === e as number);
        if (tratamiento) {
            setSelectedTratamiento(tratamiento);
            cargoValues.persona.tratamiento = tratamiento;
        }
    };

    const renderSelectedTratamiento = () => {
        return selectedTratamiento.nombre;
    }

    return (

        <Grid item md={3} xs={12} className={classes.inputItem} id="tratamiento">
            <InputLabel id="tratamiento-select-label">Tratamiento</InputLabel>
            {selectedTratamiento.id && <Select
                labelId="tratamiento-select-label"
                input={<Input />}
                value={selectedTratamiento.id}
                onChange={(e) => handleChangeTratamiento(e.target.value)}
                renderValue={renderSelectedTratamiento}
            >
                {tratamientos.map((tratamiento) =>
                    <MenuItem key={tratamiento.id} value={tratamiento.id}>
                        {tratamiento.nombre}
                    </MenuItem>
                )}
            </Select>}
        </Grid>
    );

}

export default SelectTratamiento;