import * as React from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cargoActions } from "../../store/actions/cargo.actions";
import { RootState } from "../../store/reducers";
import Dashboard from "../dashboard/Dashboard";
import { selectedCargoActions } from '../../store/actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dataGridContainer: {
            height: 700,
            width: '80%',
            paddingLeft: drawerWidth + 20,
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
    const colectivosSelected = useSelector((state: RootState) => state.selectedColectivo);
    const cargos = useSelector((state: RootState) => state.cargos.rows);
    const cargosTotalCount: number = useSelector((state: RootState) => state.cargos.count);
    const cargosNextPageUrl: string = useSelector((state: RootState) => state.cargos.nextPage);
    const cargosPrevPageUrl: string = useSelector((state: RootState) => state.cargos.prevPage);
    const cargosCurrentPage: number = useSelector((state: RootState) => state.cargos.currentPage);
    const cargosSelected: number[] = useSelector((state: RootState) => state.selectedCargo);

    const setCargoSelected = (event: GridSelectionModel) => {
        dispatch(selectedCargoActions.cargoSet(event as number[]));
    }

    useEffect(() => {
        dispatch(cargoActions.get_all(colectivosSelected));
    }, [colectivosSelected, dispatch]);

    const handlePage = (newPage: number) => {

        if (newPage > cargosCurrentPage) {
            dispatch(cargoActions.get_page(cargosNextPageUrl, newPage));
        }
        else {
            dispatch(cargoActions.get_page(cargosPrevPageUrl, newPage));
        }
    }

    return (
        <>
            <Dashboard></Dashboard>
            <div className={classes.dataGridContainer}>
                <DataGrid
                    rows={cargos}
                    columns={columns}
                    pageSize={25}
                    pagination
                    paginationMode="server"
                    rowsPerPageOptions={[0]}
                    rowCount={cargosTotalCount}
                    onPageChange={(newPage) => handlePage(newPage)}
                    checkboxSelection
                    disableSelectionOnClick
                    //autoPageSize
                    onSelectionModelChange={(newSelectionModel) => {
                        setCargoSelected(newSelectionModel);
                    }}
                    selectionModel={cargosSelected}
                />
            </div>
        </>
    );
}

export default Contactos;
