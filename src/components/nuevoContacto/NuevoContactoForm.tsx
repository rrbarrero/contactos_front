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
import FormStepOne from './FormStepOne';


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


    // // TODO: PASAR A REDUX
    // const [cargoTerminado, setCargoTerminado] = useState(false);



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