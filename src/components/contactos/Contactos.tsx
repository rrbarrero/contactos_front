import * as React from 'react';
// import { GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cargoActions } from "../../store/actions/cargo.actions";
import { colectivoActions } from '../../store/actions/colectivo.actions';
import { RootState } from "../../store/reducers";
import Dashboard from "../dashboard/Dashboard";
import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dataGridContainer: {
            height: 700,
            width: '80%',
            paddingLeft: drawerWidth,
        }
    }),
);

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
        field: 'cargo',
        headerName: 'Cargo',
        width: 350,
        editable: true,
    },
    {
        field: 'empresa',
        headerName: 'Empresa',
        width: 350,
        editable: true,
    },
    {
        field: 'ciudad',
        headerName: 'Ciudad',
        width: 200,
        editable: true,
    },
    {
        field: 'colectivo',
        headerName: 'Colectivo',
        type: 'number',
        width: 200,
        editable: true,
    }
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'lastName') || ''
    //     }`,
    // },
];



const Contactos = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    //const user = useSelector((state: RootState) => state.authentication.user);
    const colectivosSelected = useSelector((state: RootState) => state.selectedColectivo);
    const cargos = useSelector((state: RootState) => state.cargos);
    const [cargosSelected, setCargosSelected] = React.useState<GridSelectionModel>([]);

    useEffect(() => {
        dispatch(cargoActions.get_all(colectivosSelected));
    }, [colectivosSelected, dispatch]);

    return (
        <>
            <Dashboard></Dashboard>
            <div className={classes.dataGridContainer}>
                <DataGrid
                    rows={cargos}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={(newSelectionModel) => {
                        setCargosSelected(newSelectionModel);
                    }}
                    selectionModel={cargosSelected}
                />
            </div>
        </>
    );
}

export default Contactos;
