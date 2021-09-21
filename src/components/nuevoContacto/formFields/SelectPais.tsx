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


const SelectPais = (selectArgs: SelectArgs) => {

    const DEFAULT_SELECTED = 'españa';
    const { classes, cargoValues } = selectArgs;

    const dispatch = useDispatch();
    const paises = useSelector((state: RootState) => state.paises);
    const [selectedPais, setSelectedPais] = useState<Pais>({ nombre: '' });


    useEffect(() => {
        /*
            Fix default país to "españa"
        */
        const pais = paises.find((pais) => pais.nombre.toLowerCase() === DEFAULT_SELECTED);
        if (pais?.id) {
            setSelectedPais(pais);
            cargoValues.pais = pais;
        }
    }, [cargoValues, dispatch, paises]);

    const handleChangePais = (paisId: number) => {
        /*
            Set state of selectedPais on inputSelect change
        */
        const pais = paises.find(pa => pa.id === paisId);
        if (pais?.id) {
            setSelectedPais(pais);
            cargoValues.pais = pais;
        }
    };

    const renderSelectedPais = () => {
        return selectedPais.nombre;
    }

    return (

        <Grid item md={4} xs={12} className={classes.inputItem} id="pais">
            <InputLabel id="pais-select-label">Pais</InputLabel>
            {selectedPais.id && <Select
                labelId="pais-select-label"
                input={<Input />}
                value={selectedPais.id ? selectedPais.id : 1}
                onChange={(e) => handleChangePais(e.target.value as number)}
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