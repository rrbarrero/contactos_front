import { createStyles, Grid, makeStyles, Paper, TextField, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import { Dashboard } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cargoService, personaService } from "../../services";
import { appActions } from "../../store/actions";
import { customDialogActions } from "../../store/actions/custom-dialog.actions";
import ConfirmationDialog from "../commons/ConfirmationDialog";
import ValidationSchema from "../nuevoContacto/ContactoFormValidation";
import SelectTratamiento from "../nuevoContacto/formFields/SelectTratamiento";


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

// type TypeCurrentStepComp = {
//     values: Cargo,
//     touched: FormikTouched<Cargo>
//     errors: FormikErrors<Cargo>,
//     handleBlur: any,
// }


type ParamsType = {
    cargoId: string,
}

const EditarContactoForm = () => {
    const { cargoId } = useParams<ParamsType>();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [cargo, setCargo] = useState<Cargo>();

    useEffect(() => {
        cargoService.get_one(Number(cargoId)).then(cargo => setCargo(cargo));
    }, [cargoId]);

    useEffect(() => {
        dispatch(appActions.setAppTitle(`Editar contacto: ${cargo?.persona.nombre} ${cargo?.persona.apellidos}`))
    }, [cargo?.persona.apellidos, cargo?.persona.nombre, dispatch]);

    const handleChangeNombre = (nombre: string, formValues: Cargo) => {
        //TODO setCargo(...cargo, nombre);
        formValues.persona.nombre = nombre;
    }


    return <>
        <Dashboard></Dashboard>
        <ConfirmationDialog />
        <Box className={classes.box}>
            {(cargo) && <Formik
                initialValues={cargo}
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
                            <Grid container spacing={2}>
                                <SelectTratamiento classes={classes} cargoValues={values} />
                                <Grid item md={3} xs={12} className={classes.inputItem}>
                                    <TextField
                                        fullWidth
                                        id="nombre"
                                        name="persona.nombre"
                                        label="Nombre"
                                        value={values.persona.nombre}
                                        onChange={(e) => handleChangeNombre(e.target.value, values)}
                                        onBlur={handleBlur}
                                        error={touched.persona?.nombre && Boolean(errors.persona?.nombre)}
                                        helperText={touched.persona?.nombre && errors.persona?.nombre}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Form>
                );
            }}
            </Formik>}
        </Box>
    </>
}

export default EditarContactoForm;