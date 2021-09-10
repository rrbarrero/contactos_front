import React, { useEffect } from 'react';
import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { colectivoActions, appActions } from '../../store/actions';
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
            maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
            width: 350,
        },
    },
};

const ColectivoDropdown = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.authentication);
    const colectivos = useSelector((state: RootState) => state.colectivos);
    const selectedColectivos = useSelector((state: RootState) => state.appStates.selectedColectivos);

    useEffect(() => {
        if (colectivos.length === 0) {
            dispatch(colectivoActions.get_all_colectivos());
        }
    }, [colectivos.length, dispatch, user]);

    const handleChange = (colectivoId: number) => {
        dispatch(appActions.setSelectedColectivos(colectivoId));
    }

    const renderSelected = (selected: number[]) => {
        const seleccionados: (string | undefined)[] = selected.map(colectivoId => {
            return colectivos.find(colectivo => colectivo.id === colectivoId)?.nombre;
        });
        if (seleccionados.length > 1) {
            return seleccionados.join(', ').slice(0, 16) + `... (${seleccionados.length.toString()})`;
        }
        return seleccionados.join(', ');
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="colectivos-checkbox-label" className={classes.inputLabel}>Colectivo</InputLabel>
                <Select
                    labelId="colectivos-checkbox-label"
                    id="colectivos-checkbox"
                    onChange={(e) => handleChange(e.target.value as number)}
                    name="colectivo"
                    input={<Input />}
                    value={selectedColectivos}
                    renderValue={(selected) => renderSelected(selected as number[])}
                    className={classes.multiSelect}
                    MenuProps={MenuProps}
                    multiple
                >
                    {colectivos.map((colectivo) =>
                        <MenuItem key={colectivo.id} value={colectivo.id}>
                            <Checkbox checked={selectedColectivos.indexOf(colectivo.id || 0) > -1} />
                            <ListItemText primary={colectivo.nombre} />
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    )
}

export default ColectivoDropdown