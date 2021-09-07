import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectionsActions } from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";

const SelectTratamiento = (values: Tratamiento) => {

    const DEFAULT_SELECTED = 'sr. d.';
    const dispatch = useDispatch();
    const tratamientos = useSelector((state: RootState) => state.tratamientos);
    const selectedTratamiento = useSelector((state: RootState) => state.selectionReducer.tratamiento);

    useEffect(() => {
        /*
            Fix default selectedTratamiento to "Sr. D."
        */
        if (tratamientos.length > 0) {
            const tratamiento = tratamientos.find((tr) => tr.nombre.toLowerCase() === DEFAULT_SELECTED);
            if (tratamiento?.id) {
                dispatch(selectionsActions.tratamientoSet(tratamiento.id));
            }
        }
    }, [tratamientos, dispatch]);


    const handleChangeTratamiento = (e: unknown) => {
        const tratamiento: Tratamiento | undefined = tratamientos.find(tr => tr.id === e as number);
        if (tratamiento?.id) {
            dispatch(selectionsActions.tratamientoSet(tratamiento.id));
        }
    };

    const renderSelectedTratamiento = () => {
        const tratamiento = tratamientos.find((col) => col.id === selectedTratamiento);
        if (tratamiento) {
            return tratamiento.nombre;
        }
    }

    return (

        <Grid item md={2} xs={12}>
            <InputLabel id="tratamiento-select-label">Tratamiento</InputLabel>
            {selectedTratamiento !== 0 && <Select
                labelId="tratamiento-select-label"
                id="tratamiento"
                input={<Input />}
                value={values.id}
                onChange={(e) => handleChangeTratamiento(e.target.value)}
                renderValue={renderSelectedTratamiento}
                defaultValue={tratamientos.length > 0 ? tratamientos[0].id : 0}
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