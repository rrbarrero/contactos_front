import 'react-app-polyfill/ie11';
import { Formik, Form } from 'formik';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dashboard from '../dashboard/Dashboard';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ValidationSchema from './ContactoFormValidation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/reducers";
import { cargoActions, colectivoActions, paisActions, provinciaActions, appActions, tratamientoActions } from '../../store/actions';
import { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectPais from './formFields/SelectPais';
import SelectColectivo from './formFields/SelectColectivo';
import moment from 'moment';
import SelectSubColectivo from './formFields/SelectSubColectivo';
import SelectTratamiento from './formFields/SelectTratamiento';
import NuevoContactoStepper from './NuevoContactoStepper';
import SelectProvincia from './formFields/SelectProvincia';
import { initialCargoState } from '../../store/reducers/cargo.reducers';


//moment.locale("es");

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            paddingLeft: drawerWidth + 20,
            paddingRight: 20,
            display: 'grid',
            // gridTemplateColumns: '70% 25%',
            // columnGap: '20px',
        },
        form: {
            color: 'black',
            textDecoration: 'none',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

        inputItem: {
            marginLeft: 30,
            marginTop: 30,
        },
        control: {
            padding: theme.spacing(2),
        },
        dateField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        }
    }),
);

const NuevoContactoForm = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const nombre = useSelector((state: RootState) => state.cargo.persona.nombre);
    const apellidos = useSelector((state: RootState) => state.cargo.persona.apellidos);
    const cargo = useSelector((state: RootState) => state.cargo.cargo);
    const empresa = useSelector((state: RootState) => state.cargo.empresa);
    const finalizado = useSelector((state: RootState) => state.cargo.finalizado);
    const direccion = useSelector((state: RootState) => state.cargo.direccion);
    const ciudad = useSelector((state: RootState) => state.cargo.ciudad);


    // // TODO: PASAR A REDUX
    // const [cargoTerminado, setCargoTerminado] = useState(false);

    // TODO: PASAR A REDUX
    const [fechaCese, setFechaCese] = useState(moment().format('yyyy-MM-DD'));

    useEffect(() => {
        dispatch(appActions.stepperSet(0));
    }, [dispatch]);

    useEffect(() => {
        dispatch(paisActions.get_all_paises());
    }, [dispatch]);

    useEffect(() => {
        dispatch(tratamientoActions.get_all_tratamientos());
    }, [dispatch]);

    useEffect(() => {
        dispatch(provinciaActions.get_all_provincias());
    }, [dispatch]);

    useEffect(() => {
        dispatch(colectivoActions.get_all_colectivos());
    }, [dispatch]);


    const handleChangeFinalizado = (e: boolean) => {
        dispatch(cargoActions.setFinalizado(e));
    };

    const handleChangeNombre = (nombre: string, formValues: Cargo) => {
        dispatch(cargoActions.setPersonaNombre(nombre));
        formValues.persona.nombre = nombre;
    }

    const handleChangeApellidos = (apellidos: string, formValues: Cargo) => {
        dispatch(cargoActions.setPersonaApellidos(apellidos));
        formValues.persona.apellidos = apellidos;
    }

    const handleChangeCargo = (cargoCargo: string, formValues: Cargo) => {
        dispatch(cargoActions.setCargo(cargoCargo));
        formValues.cargo = cargoCargo;
    }

    const handleChangeEmpresa = (empresa: string, formValues: Cargo) => {
        dispatch(cargoActions.setEmpresa(empresa));
        formValues.empresa = empresa;
    }

    const handleChangeCiudad = (ciudad: string, formValues: Cargo) => {
        dispatch(cargoActions.setCiudad(ciudad));
        formValues.ciudad = ciudad;
    }

    const handleChangeDireccion = (direccion: string, formValues: Cargo) => {
        dispatch(cargoActions.setDireccion(direccion));
        formValues.direccion = direccion;
    }

    const handleChangeFechaCese = (fechaCese: string, formValues: Cargo) => {
        dispatch(cargoActions.setFechaCese(fechaCese));
        formValues.fechaCese = fechaCese;
    }


    return (
        <>
            <Dashboard></Dashboard>
            <Box className={classes.box}>
                <Formik
                    initialValues={initialCargoState}
                    //validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        //values.fechaAlta = new Date();
                        /* if (selectedTratamiento) {
                            values.persona.tratamiento = { ...selectedTratamiento };
                        } */
                        //values.finalizado = cargoTerminado;
                        console.log("SUBMITED FORM", values);
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }}
                >{props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset
                    } = props;
                    return (
                        <Form>
                            <Paper className={classes.control}>

                                <Grid container spacing={2}>
                                    <SelectTratamiento classes={classes} cargoValues={values} />
                                    <Grid item md={3} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="nombre"
                                            name="persona.nombre"
                                            label="Nombre"
                                            value={nombre}
                                            onChange={(e) => handleChangeNombre(e.target.value, values)}
                                            error={touched.persona?.nombre && Boolean(errors.persona?.nombre)}
                                            helperText={touched.persona?.nombre && errors.persona?.nombre}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="apellidos"
                                            name="persona.apellidos"
                                            label="Apellidos"
                                            value={apellidos}
                                            onChange={(e) => handleChangeApellidos(e.target.value, values)}
                                            error={touched.persona?.apellidos && Boolean(errors.persona?.apellidos)}
                                            helperText={touched.persona?.apellidos && errors.persona?.apellidos}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="cargo"
                                            name="cargo"
                                            label="Cargo"
                                            value={cargo}
                                            onChange={(e) => handleChangeCargo(e.target.value, values)}
                                            error={touched.cargo && Boolean(errors.cargo)}
                                            helperText={touched.cargo && errors.cargo}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="empresa"
                                            name="empresa"
                                            label="Empresa"
                                            value={empresa}
                                            onChange={(e) => handleChangeEmpresa(e.target.value, values)}
                                            error={touched.empresa && Boolean(errors.empresa)}
                                            helperText={touched.empresa && errors.empresa}
                                        />
                                    </Grid>
                                    <Grid item md={5} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="direccion"
                                            name="direccion"
                                            label="Dirección"
                                            value={direccion}
                                            onChange={(e) => handleChangeDireccion(e.target.value, values)}
                                            error={touched.direccion && Boolean(errors.direccion)}
                                            helperText={touched.direccion && errors.direccion}
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="ciudad"
                                            name="ciudad"
                                            label="Ciudad"
                                            value={ciudad}
                                            onChange={(e) => handleChangeCiudad(e.target.value, values)}
                                            error={touched.ciudad && Boolean(errors.ciudad)}
                                            helperText={touched.ciudad && errors.ciudad}
                                        />
                                    </Grid>
                                    <SelectProvincia classes={classes} cargoValues={values} />
                                    <SelectPais classes={classes} cargoValues={values} />
                                    <SelectColectivo classes={classes} cargoValues={values} />
                                    <SelectSubColectivo classes={classes} cargoValues={values} />
                                    <Grid item md={5} xs={12} className={classes.inputItem}>
                                        <FormControlLabel control={
                                            <Checkbox
                                                checked={finalizado}
                                                onChange={(e) => handleChangeFinalizado(e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />} label="Cargo terminado" />
                                    </Grid>
                                    <Grid item md={5} xs={12} className={classes.inputItem}>
                                        {finalizado && <TextField
                                            id="date"
                                            label="Fecha de cese"
                                            type="date"
                                            value={fechaCese}
                                            onChange={(e) => handleChangeFechaCese(e.target.value, values)}
                                            //defaultValue={fechaCese}
                                            className={classes.dateField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />}
                                    </Grid>
                                </Grid>
                                <NuevoContactoStepper />

                            </Paper>

                        </Form>
                    );
                }}
                </Formik>
            </Box>
        </>
    );
};

export default NuevoContactoForm;