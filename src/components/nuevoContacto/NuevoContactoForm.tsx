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
import { colectivoActions, provinciaActions, selectionsActions, tratamientoActions } from '../../store/actions';
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

    const provincias = useSelector((state: RootState) => state.provincias);

    //const colectivos = useSelector((state: RootState) => state.colectivos);

    const [selectedProvincia, setSelectedProvincia] = useState<Provincia>();

    const [cargoTerminado, setCargoTerminado] = useState(false);
    const [fechaCese, setFechaCese] = useState(moment().format('yyyy-MM-DD'));

    useEffect(() => {
        dispatch(selectionsActions.stepperSet(0));
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


    useEffect(() => {
        if (provincias.length > 0) {
            const defaultProvincia = provincias.find((provincia) => provincia.nombre.toLowerCase() === 'cáceres');
            if (defaultProvincia) {
                setSelectedProvincia(defaultProvincia);
            }
        }
    }, [provincias]);



    let initialValues: Cargo = {
        persona: {
            tratamiento: { nombre: '' },
            nombre: '',
            apellidos: ''
        },
        cargo: '',
        finalizado: false,
        ciudad: '',
        codPostal: '',
        direccion: '',
        provincia: { nombre: 'España' },
        pais: { nombre: '' },
        empresa: '',
        fechaAlta: new Date(),
        colectivo: { nombre: '' },
        subcolectivo: { nombre: '', colectivo: { nombre: '' } },

    }


    const handleChangeProvincia = (e: unknown) => {
        const provincia: Provincia | undefined = provincias.find(pr => pr.id === e as number);
        setSelectedProvincia(provincia);
    };


    const handleChangeCargoTerminado = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCargoTerminado(event.target.checked);
    };


    const renderSelectedProvincia = () => {
        return selectedProvincia?.nombre;
    }




    return (
        <>
            <Dashboard></Dashboard>
            <Box className={classes.box}>
                <Formik
                    initialValues={initialValues}
                    //validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        values.fechaAlta = new Date();
                        /* if (selectedTratamiento) {
                            values.persona.tratamiento = { ...selectedTratamiento };
                        } */
                        values.finalizado = cargoTerminado;
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
                                    <SelectTratamiento {...classes} />
                                    <Grid item md={3} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="nombre"
                                            name="persona.nombre"
                                            label="Nombre"
                                            value={values.persona.nombre}
                                            onChange={handleChange}
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
                                            value={values.persona.apellidos}
                                            onChange={handleChange}
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
                                            value={values.cargo}
                                            onChange={handleChange}
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
                                            value={values.empresa}
                                            onChange={handleChange}
                                            error={touched.empresa && Boolean(errors.empresa)}
                                            helperText={touched.empresa && errors.empresa}
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="ciudad"
                                            name="ciudad"
                                            label="Ciudad"
                                            value={values.ciudad}
                                            onChange={handleChange}
                                            error={touched.ciudad && Boolean(errors.ciudad)}
                                            helperText={touched.ciudad && errors.ciudad}
                                        />
                                    </Grid>
                                    <Grid item md={5} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="direccion"
                                            name="direccion"
                                            label="Dirección"
                                            value={values.direccion}
                                            onChange={handleChange}
                                            error={touched.direccion && Boolean(errors.direccion)}
                                            helperText={touched.direccion && errors.direccion}
                                        />
                                    </Grid>
                                    <SelectPais values={values.pais as Pais} classStyle={classes.inputItem} />
                                    <SelectColectivo values={values.colectivo as Colectivo} classStyle={classes.inputItem} />
                                    <SelectSubColectivo values={values.subcolectivo as SubColectivo} classStyle={classes.inputItem} />
                                    <Grid item md={5} xs={12} className={classes.inputItem}>
                                        <FormControlLabel control={
                                            <Checkbox
                                                checked={cargoTerminado}
                                                onChange={handleChangeCargoTerminado}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />} label="Cargo terminado" />
                                    </Grid>
                                    <Grid item md={5} xs={12} className={classes.inputItem}>
                                        {cargoTerminado && <TextField
                                            id="date"
                                            label="Fecha de cese"
                                            type="date"
                                            value={values.fechaCese}
                                            defaultValue={fechaCese}
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