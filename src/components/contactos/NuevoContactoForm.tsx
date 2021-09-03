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



const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            paddingLeft: drawerWidth + 20,
            display: 'grid',
            gridTemplateColumns: '45% 45%',
            columnGap: '10px',
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
                <Formik
                    initialValues={initialValues}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
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
                            <FormControl className={classes.formControl}>
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
                            </FormControl>
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
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Submit
                            </Button>
                        </Form>
                    );
                }}
                </Formik>
            </Box>
        </>
    );
};

export default NuevoContactoForm;