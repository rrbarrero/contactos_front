import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cargoActions } from "../../store/actions/cargo.actions";
import { RootState } from "../../store/reducers";
import Dashboard from "../dashboard/Dashboard";
import { selectedCargoActions } from '../../store/actions';
import { Box } from '@material-ui/core';
import ContextualMenu from './ContextualMenu';

const drawerWidth = 240;

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
    const colectivosSelected = useSelector((state: RootState) => state.selectedColectivo);
    const cargos = useSelector((state: RootState) => state.cargos.rows);
    const cargosTotalCount: number = useSelector((state: RootState) => state.cargos.count);
    const cargosNextPageUrl: string = useSelector((state: RootState) => state.cargos.nextPage);
    const cargosPrevPageUrl: string = useSelector((state: RootState) => state.cargos.prevPage);
    const cargosCurrentPage: number = useSelector((state: RootState) => state.cargos.currentPage);
    const cargosSelected: number[] = useSelector((state: RootState) => state.selectedCargo);
    const searchText = useSelector((state: RootState) => state.searchContacto);

    const setCargoSelected = (event: GridSelectionModel) => {
        dispatch(selectedCargoActions.cargoSet(event as number[]));
    }

    useEffect(() => {
        if (searchText) {
            dispatch(cargoActions.search(searchText));
        }
    }, [searchText, dispatch])

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
            <div className={classes.wrapper}>
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
                <Box className={classes.boxOptionsContainer}>
                    <ContextualMenu />
                </Box>
            </div>
        </>
    );
}

export default Contactos;
