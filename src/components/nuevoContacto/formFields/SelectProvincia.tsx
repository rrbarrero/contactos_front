import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

type SelectArgs = {
    classes: ClassNameMap,
    cargoValues: Cargo,
}


const SelectProvincia = (selectArgs: SelectArgs) => {

    const DEFAULT_SELECTED = 'cáceres';
    const { classes, cargoValues } = selectArgs;

    const dispatch = useDispatch();
    const provincias = useSelector((state: RootState) => state.provincias);
    const [selectedProvincia, setSelectedProvincia] = useState<Provincia>(cargoValues.provincia);

    useEffect(() => {
        /*
            Fix default país to "españa"
        */
        if (selectedProvincia.nombre === '') {
            const provincia = provincias.find((pr) => pr.nombre.toLowerCase() === DEFAULT_SELECTED);
            if (provincia?.id) {
                setSelectedProvincia(provincia);
                cargoValues.provincia = provincia;
            }
        }
    }, [cargoValues, dispatch, provincias, selectedProvincia.nombre]);

    const handleChangeProvincia = (ProvinciaId: number) => {
        /*
            Set state of selectedProvincia on inputSelect change
        */
        const provincia = provincias.find(pr => pr.id === ProvinciaId);
        if (provincia?.id) {
            setSelectedProvincia(provincia)
            cargoValues.provincia = provincia;
        }
    };

    const renderSelectedProvincia = () => {
        return selectedProvincia.nombre;
    }

    return (

        <Grid item md={4} xs={12} className={classes.inputItem} id="provincia">
            <InputLabel id="Provincia-select-label">Provincia</InputLabel>
            {selectedProvincia.id && <Select
                labelId="Provincia-select-label"
                input={<Input />}
                value={selectedProvincia.id ? selectedProvincia.id : 1}
                onChange={(e) => handleChangeProvincia(e.target.value as number)}
                renderValue={renderSelectedProvincia}
            >
                {provincias.map((provincia) =>
                    <MenuItem key={provincia.id} value={provincia.id}>
                        {provincia.nombre}
                    </MenuItem>
                )}
            </Select>}
        </Grid>
    );
}

export default SelectProvincia;