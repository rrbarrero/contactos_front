import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargoActions } from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

type SelectArgs = {
    classes: ClassNameMap,
    cargoValues: Cargo,
}


const SelectSubColectivo = (selectArgs: SelectArgs) => {

    /*
        Logic about subColectivo inputSelect
    */

    const dispatch = useDispatch();
    const { classes, cargoValues } = selectArgs;

    const selectedColectivo: Colectivo = useSelector((state: RootState) => state.cargo.colectivo);
    const selectedSubColectivo: SubColectivo = useSelector((state: RootState) => state.cargo.subcolectivo);
    const subColectivos: SubColectivos = useSelector((state: RootState) => state.subColectivos);

    const handleChangeSubColectivo = (e: unknown) => {
        /* 
            set state of selectedSubColectivo on inputSelect change
        */
        const subColectivo: SubColectivo | undefined = subColectivos.find(su => su.id === e as number);
        if (subColectivo?.id) {
            dispatch(cargoActions.setColectivo(subColectivo));
            cargoValues.subcolectivo = subColectivo;
        }
    };

    useEffect(() => {
        /*
            Set first subColectivo when change Colectivo
        */
        if (subColectivos[0]?.id) {
            dispatch(cargoActions.setSubColectivo(subColectivos[0]));
            cargoValues.subcolectivo = subColectivos[0];
        }
    }, [cargoValues, dispatch, selectedColectivo, subColectivos]);

    const renderSelectedSubColectivo = () => {
        return selectedSubColectivo.nombre;
    }

    return (
        <Grid item md={5} xs={12} className={classes.inputItem} id="subcolectivo">
            <InputLabel id="subcolectivo-select-label">SubColectivo</InputLabel>
            {selectedSubColectivo.id && <Select
                labelId="subcolectivo-select-label"
                input={<Input />}
                value={selectedSubColectivo.id}
                onChange={(e) => handleChangeSubColectivo(e.target.value)}
                renderValue={renderSelectedSubColectivo}
            >
                {subColectivos.map((subColectivo) =>
                    <MenuItem key={subColectivo.id} value={subColectivo.id}>
                        {subColectivo.nombre}
                    </MenuItem>
                )}
            </Select>}
        </Grid>

    );
}

export default SelectSubColectivo;