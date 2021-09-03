import 'react-app-polyfill/ie11';
import { Formik, Field, Form, FormikHelpers, useFormik, FormikProps, withFormik } from 'formik';
import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dashboard from '../dashboard/Dashboard';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ValidationSchema from './ContactoFormValidation';



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
        }
    }),
);

const NuevoContactoForm = () => {

    const classes = useStyles();

    let initialValues: Cargo = {
        persona: { tratamiento: { nombre: '' }, nombre: '', apellidos: '' },
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