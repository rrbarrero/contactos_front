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
import { tratamientoActions } from '../../store/actions';
import { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            paddingLeft: drawerWidth + 20,
            display: 'grid',
            gridTemplateColumns: '2% 90% 2%',
            columnGap: '20px',
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
        submitButton: {
            marginTop: 14,
        },
        inputItem: {
            marginLeft: 30,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);

const NuevoContactoForm = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const tratamientos = useSelector((state: RootState) => state.tratamientos);
    const [selectedTratamiento, setSelectedTratamiento] = useState<Tratamiento>();

    useEffect(() => {
        dispatch(tratamientoActions.get_all_tratamientos());
    }, [dispatch]);

    let initialValues: Cargo = {
        persona: {
            tratamiento: {
                id: tratamientos.length > 0 ? tratamientos[0].id : 0,
                nombre: tratamientos.length > 0 ? tratamientos[0].nombre : ''
            },
            nombre: '',
            apellidos: ''
        },
        cargo: '',
        finalizado: false,
        ciudad: '',
        codPostal: '',
        direccion: '',
        provincia: { nombre: '' },
        pais: { nombre: '' },
        empresa: '',
        fechaAlta: new Date(),
        colectivo: { nombre: '' },
        subcolectivo: { nombre: '', colectivo: { nombre: '' } },

    }

    const handleChangeTratamiento = (e: unknown) => {
        const tratamiento: Tratamiento | undefined = tratamientos.find(tr => tr.id === e as number);
        setSelectedTratamiento(tratamiento);
    };

    const renderSelected = () => {
        return selectedTratamiento?.nombre;
    }

    return (
        <>
            <Dashboard></Dashboard>
            <Box className={classes.box}>
                <div></div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        values.fechaAlta = new Date();
                        if (selectedTratamiento) {
                            values.persona.tratamiento = { ...selectedTratamiento };
                        }
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
                                    <Grid item md={2} xs={12}>
                                        <InputLabel id="tratamiento-select-label">Tratamiento</InputLabel>
                                        <Select
                                            labelId="tratamiento-select-label"
                                            id="tratamiento"
                                            input={<Input />}
                                            value={values.persona.tratamiento.id}
                                            onChange={(e) => handleChangeTratamiento(e.target.value)}
                                            renderValue={renderSelected}
                                            defaultValue={tratamientos.length > 0 ? tratamientos[0].id : 0}
                                        >
                                            {tratamientos.map((tratamiento) =>
                                                <MenuItem key={tratamiento.id} value={tratamiento.id}>
                                                    {tratamiento.nombre}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </Grid>
                                    <Grid item md={2} xs={12} className={classes.inputItem}>
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
                                    <Grid item md={2} xs={12} className={classes.inputItem}>
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
                                    <Grid item md={3} xs={12} className={classes.inputItem}>
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
                                    <Grid item md={3} xs={12} className={classes.inputItem}>
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
                                    <Grid item md={2} xs={12} className={classes.inputItem}>
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
                                    <Grid item md={2} xs={12} className={classes.inputItem}>
                                        <TextField
                                            fullWidth
                                            id="direccion"
                                            name="direccion"
                                            label="Direccion"
                                            value={values.direccion}
                                            onChange={handleChange}
                                            error={touched.direccion && Boolean(errors.direccion)}
                                            helperText={touched.direccion && errors.direccion}
                                        />
                                    </Grid>
                                </Grid>
                                <Button className={classes.submitButton} color="primary" variant="contained" type="submit">
                                    Submit
                                </Button>
                            </Paper>

                        </Form>
                    );
                }}
                </Formik>
                <div></div>
            </Box>
        </>
    );
};

export default NuevoContactoForm;