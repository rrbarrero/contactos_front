import 'react-app-polyfill/ie11';
import { Formik, Form } from 'formik';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dashboard from '../dashboard/Dashboard';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/reducers";
import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import NuevoContactoStepper from './NuevoContactoStepper';
import { initialCargoState } from '../../store/reducers/cargo.reducers';
import FormStepOne from './FormStepOne';
import { appActions, colectivoActions, paisActions, provinciaActions, tratamientoActions } from '../../store/actions';


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


    const formStepPage = useSelector((state: RootState) => state.appStates.stepperCurrent);

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
                        // dirty,
                        // isSubmitting,
                        // handleChange,
                        // handleBlur,
                        // handleSubmit,
                        // handleReset
                    } = props;
                    return (
                        <Form>
                            <Paper className={classes.control}>
                                {formStepPage === 0 && <FormStepOne
                                    formValues={values}
                                    formErrors={errors}
                                    formTouched={touched}
                                    classes={classes}
                                />}


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