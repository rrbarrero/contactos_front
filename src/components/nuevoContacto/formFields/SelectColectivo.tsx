import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectionsActions, subColectivoActions } from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        
    }),
);


const SelectColectivo = (values: Colectivo) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const colectivos = useSelector((state: RootState) => state.colectivos);
    const selectedColectivo: number = useSelector((state: RootState) => state.selectionReducer.single_colectivo);
    
    useEffect(()=>{
        if(selectedColectivo){
            const colectivo = colectivos.find((col)=>col.id===selectedColectivo);
            if(colectivo){
                dispatch(subColectivoActions.get_subcolectivos(colectivo));
            }
        }
    },[selectedColectivo, dispatch, colectivos]);

    useEffect(()=> {
        if(colectivos.length>0){
            const colectivo = colectivos.find((colectivo)=> colectivo.nombre.toLowerCase()==='junta de extremadura');
            if(colectivo?.id){
                dispatch(selectionsActions.colectivoSingleSet(colectivo.id));
            }
        }
    },[colectivos, dispatch]);

    const handleChangeColectivo = (e: unknown) => {
        const colectivo: Colectivo | undefined = colectivos.find(co => co.id === e as number);
        if(colectivo?.id){
            dispatch(selectionsActions.colectivoSingleSet(colectivo.id));
        }
    };

    const renderSelectedColectivo = () => {
        const colectivo = colectivos.find((col)=>col.id===selectedColectivo);
        if(colectivo){
            return colectivo.nombre;
        }
    }

    return (
        <Grid item md={2} xs={12}>
            <InputLabel id="colectivo-select-label">Colectivo</InputLabel>
            {selectedColectivo!==0 && <Select
                labelId="colectivo-select-label"
                id="colectivo"
                input={<Input />}
                value={values.id}
                onChange={(e) => handleChangeColectivo(e.target.value)}
                renderValue={renderSelectedColectivo}
                defaultValue={selectedColectivo}
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