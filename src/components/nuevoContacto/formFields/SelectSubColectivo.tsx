import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectionsActions } from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";

type InputType = {
    values: SubColectivo,
    classStyle: string,
}

const SelectSubColectivo =  ({values, classStyle}: InputType) => {

    /*
        Logic about subColectivo inputSelect
    */

    const dispatch = useDispatch();

    const selectedColectivo = useSelector((state: RootState) => state.selectionReducer.singleColectivo);
    const selectedSubColectivo = useSelector((state: RootState) => state.selectionReducer.subColectivo);
    const subColectivos = useSelector((state: RootState) => state.subColectivos);

    const handleChangeSubColectivo = (e: unknown) => {
        /* 
            set state of selectedSubColectivo on inputSelect change
        */
        const subColectivo: SubColectivo | undefined = subColectivos.find(su => su.id === e as number);
        if (subColectivo?.id) {
            dispatch(selectionsActions.subColectivoSet(subColectivo.id));
        }
    };

    useEffect(() => {
        /*
            Set first subColectivo when change Colectivo
        */
        if (subColectivos[0]?.id) {
            dispatch(selectionsActions.subColectivoSet(subColectivos[0].id));
        }
    }, [dispatch, selectedColectivo, subColectivos]);

    const renderSelectedSubColectivo = () => {
        const subColectivo = subColectivos.find((sub) => sub.id === selectedSubColectivo);
        if (subColectivo) {
            return subColectivo.nombre;
        }
    }

    return (
        <Grid item md={5} xs={12} className={classStyle}>
            <InputLabel id="subcolectivo-select-label">SubColectivo</InputLabel>
            {selectedSubColectivo && <Select
                labelId="subcolectivo-select-label"
                id="subcolectivo"
                input={<Input />}
                value={values ? values.id : 0}
                onChange={(e) => handleChangeSubColectivo(e.target.value)}
                renderValue={renderSelectedSubColectivo}
                defaultValue={subColectivos.length > 0 ? subColectivos[0].id : 0}
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