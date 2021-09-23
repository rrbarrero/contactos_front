import 'react-app-polyfill/ie11';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dashboard from '../dashboard/Dashboard';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/reducers";
import { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import NuevoContactoStepper from './NuevoContactoStepper';
import FormStepOne from './FormStepOne';
import { appActions, colectivoActions, paisActions, provinciaActions, tratamientoActions } from '../../store/actions';
import FormStepTwo from './FormStepTwo';
import ValidationSchema from './ContactoFormValidation';
import { cargoService, personaService } from '../../services';
import { customDialogActions } from '../../store/actions/custom-dialog.actions';
import ConfirmationDialog from '../commons/ConfirmationDialog';
import { history } from '../../helpers';
import FormStepThree from './FormStepThree';


//moment.locale("es");

const drawerWidth = 210;

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

type TypeCurrentStepComp = {
    values: Cargo,
    touched: FormikTouched<Cargo>
    errors: FormikErrors<Cargo>,
    handleBlur: any,
}

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

const CurrentStepComp = ({ values, errors, touched, handleBlur }: TypeCurrentStepComp) => {

    const classes = useStyles();
    const formStepPage = useSelector((state: RootState) => state.appStates.stepperCurrent);

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
        case 2: {
            comp = <FormStepThree formValues={values} />
            break;
        }
    }
    return comp;
}

const NuevoContactoForm = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [resetForNew, setResetForNew] = useState(false);

    useEffect(() => {
        dispatch(customDialogActions.setData({
            title: "Nuevo contacto",
            body: "Contacto guardado con éxito. ¿Quiere seguir añadiendo más?",
            status: false,
            onAccept: () => {
                dispatch(customDialogActions.toggleState());
                setResetForNew(true);
            },
            onCancel: () => {
                dispatch(customDialogActions.toggleState());
                history.push('/contactos');
            }
        }))
    })

    useEffect(() => {
        dispatch(appActions.setAppTitle('Nuevo contacto'))
    }, [dispatch, resetForNew]);

    useEffect(() => {
        dispatch(appActions.stepperSet(0));
    }, [dispatch, resetForNew]);

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
            <ConfirmationDialog />
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
                                dispatch(customDialogActions.toggleState());
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