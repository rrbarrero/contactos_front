import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cargoActions } from "../../store/actions/cargo.actions";
import { colectivoActions } from '../../store/actions/colectivo.actions';
import { RootState } from "../../store/reducers";
import Dashboard from "../dashboard/Dashboard"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);


const Contactos = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    //const user = useSelector((state: RootState) => state.authentication.user);
    const colectivosSelected = useSelector((state: RootState) => state.selectedColectivo);
    const cargos = useSelector((state: RootState) => state.cargos);


    useEffect(() => {
        dispatch(cargoActions.get_all(colectivosSelected));
    }, [colectivosSelected, dispatch]);

    return (
        <>
            <Dashboard></Dashboard>
        </>
    );
}

export default Contactos;
