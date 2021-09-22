import 'react-app-polyfill/ie11';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dashboard from '../dashboard/Dashboard';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/reducers";
import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import NuevoContactoStepper from './NuevoContactoStepper';
import FormStepOne from './FormStepOne';
import { appActions, colectivoActions, paisActions, provinciaActions, tratamientoActions } from '../../store/actions';
import FormStepTwo from './FormStepTwo';
import ValidationSchema from './ContactoFormValidation';
import { cargoService, personaService } from '../../services';


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
            marginTop: 15,
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

    let formInitialValues = {
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
        provincia: { nombre: '' },
        pais: { nombre: '' },
        empresa: '',
        fechaAlta: new Date(),
        colectivo: { nombre: '' },
        subcolectivo: { nombre: '', colectivo: { nombre: '' } },
        telefonos: [],
        correos: [],
    };

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

    type TypeCurrentStepComp = {
        values: Cargo,
        touched: FormikTouched<Cargo>
        errors: FormikErrors<Cargo>,
        handleBlur: any,
    }

    const CurrentStepComp = ({ values, errors, touched, handleBlur }: TypeCurrentStepComp) => {
        let comp: JSX.Element = <></>;
        switch (formStepPage) {
            case 0: {
                comp = <FormStepOne
                    formValues={values}
                    formErrors={errors}
                    formTouched={touched}
                    classes={classes}
                    handleBlur={handleBlur} />
                break;
            }
            case 1: {
                comp = <FormStepTwo
                    formValues={values}
                    formErrors={errors}
                    formTouched={touched} />
                break;
            }
        }
        return comp;

    }

    return (
        <>
            <Dashboard></Dashboard>
            <Box className={classes.box}>
                <Formik
                    initialValues={formInitialValues}
                    validationSchema={ValidationSchema}
                    validateOnBlur={true}
                    onSubmit={(values, actions) => {
                        //values.fechaAlta = new Date();
                        /* if (selectedTratamiento) {
                            values.persona.tratamiento = { ...selectedTratamiento };
                        } */
                        //values.finalizado = cargoTerminado;
                        console.log("SUBMITED FORM", values);
                        //alert(JSON.stringify(values, null, 2));
                        // actions.setSubmitting(false);
                        personaService.create(values.persona).then(persona => {
                            cargoService.create({ ...values, persona: persona }).then(cargo => {
                                console.log(cargo);
                            })
                        })
                    }}
                >{props => {
                    const {
                        values,
                        touched,
                        errors,
                        // dirty,
                        // isSubmitting,
                        // handleChange,
                        handleBlur,
                        // handleSubmit,
                        // handleReset
                    } = props;
                    return (
                        <Form>
                            <Paper className={classes.control}>
                                <CurrentStepComp values={values} errors={errors} touched={touched} handleBlur={handleBlur} />
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