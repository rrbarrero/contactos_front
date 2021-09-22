import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cargosActions } from "../../store/actions/cargos.actions";
import { RootState } from "../../store/reducers";
import Dashboard from "../dashboard/Dashboard";
import { appActions } from '../../store/actions';
import { Box } from '@material-ui/core';
import ContextualMenu from './ContextualMenu';

const drawerWidth = 210;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            display: 'grid',
            gridTemplateColumns: '85% 13%',
            columnGap: '10px',
        },
        dataGridContainer: {
            height: 700,
            // width: '72%',
            paddingLeft: drawerWidth + 20,
        },
        boxOptionsContainer: {
            height: 700,
            // width: '15%',
            // marginLeft: 5,
            //backgroundColor: 'rgb(231 232 240)',
            borderRadius: 2,
        }, backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        }
    }),
);

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
        field: 'nombre',
        headerName: 'Nombre',
        width: 170,
        editable: true,
        valueFormatter: (params) => params.row?.persona.nombre, //row?.maintenancePlan?.name 
    },
    {
        field: 'apellidos',
        headerName: 'Apellidos',
        width: 220,
        editable: true,
        valueFormatter: (params) => params.row?.persona.apellidos, //row?.maintenancePlan?.name 
    },
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
        field: 'telefonos',
        headerName: 'Teléfono',
        width: 150,
        editable: true,
        valueFormatter: (params) => params.row?.telefonos.length > 0 ? params.row?.telefonos[0].numero : '', //row?.maintenancePlan?.name 
    },
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
    const colectivosSelected = useSelector((state: RootState) => state.appStates.selectedColectivos);
    const cargosSelected: number[] = useSelector((state: RootState) => state.appStates.selectedCargos);
    const cargos = useSelector((state: RootState) => state.cargos);
    const searchText = useSelector((state: RootState) => state.searchContacto);

    const setCargoSelected = (event: GridSelectionModel) => {
        dispatch(appActions.setSelectedCargos(event as number[]));
    }

    useEffect(() => {
        dispatch(appActions.setAppTitle("Contactos"));
    });

    useEffect(() => {
        if (searchText) {
            dispatch(cargosActions.search(searchText));
        }
    }, [searchText, dispatch]);

    useEffect(() => {
        dispatch(cargosActions.get_all(colectivosSelected));
    }, [colectivosSelected, dispatch]);

    const handlePage = (newPage: number) => {

        if (newPage > cargos.currentPage) {
            dispatch(cargosActions.get_page(cargos.nextPage, newPage));
        }
        else {
            dispatch(cargosActions.get_page(cargos.prevPage, newPage));
        }
    }

    return (
        <>
            <Dashboard />
            <div className={classes.wrapper}>
                <div className={classes.dataGridContainer}>
                    <DataGrid
                        rows={cargos.rows}
                        columns={columns}
                        pageSize={25}
                        pagination
                        paginationMode="server"
                        rowsPerPageOptions={[25]}
                        rowCount={cargos.count}
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
                <Box className={classes.boxOptionsContainer}>
                    <ContextualMenu />
                </Box>
            </div>
        </>
    );
}

export default Contactos;