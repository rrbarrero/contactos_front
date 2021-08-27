import React from 'react';
import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { colectivoActions, userActions } from '../../store/actions';
import { RootState } from '../../store/reducers';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            marginRight: '5rem',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        inputLabel: {
            color: 'white',
            margin: "5px",
        },
        multiSelect: {
            color: 'white',
            margin: "5px",
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ColectivoDropdown = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.authentication.user);
    const colectivos = useSelector((state: RootState) => state.colectivos);
    const [colectivosSeleccionados, setColectivosSeleccionados] = React.useState<string[]>([]);

    if (user?.token && colectivos.length === 0) {
        dispatch(colectivoActions.get_all());
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setColectivosSeleccionados(event.target.value as string[]);
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label" className={classes.inputLabel}>Colectivo</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    onChange={handleChange}
                    name="colectivo"
                    input={<Input />}
                    value={colectivosSeleccionados}
                    renderValue={(selected) => (selected as string[]).join(', ').slice(0, 12) + `... (${colectivosSeleccionados.length.toString()})`}
                    className={classes.multiSelect}
                    MenuProps={MenuProps}
                    multiple
                >
                    {colectivos.map((colectivo) =>
                        <MenuItem key={colectivo.id} value={colectivo.nombre}>
                            <Checkbox checked={colectivosSeleccionados.indexOf(colectivo.nombre) > -1} />
                            <ListItemText primary={colectivo.nombre} />
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    )
}

export default ColectivoDropdown