import { Button, createStyles, makeStyles, styled, TextField, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { FormikErrors, FormikTouched } from 'formik';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telefonosActions } from "../../store/actions";
import { correosActions } from "../../store/actions/correos.actions";
import { RootState } from "../../store/reducers";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

type FormStepOneProps = {
    formValues: Cargo,
    formTouched: FormikTouched<Cargo>,
    formErrors: FormikErrors<Cargo>,
}

const _telf: Telefono = {
    nombre: '',
    numero: '',
    nota: '',
};

const _mail: Correo = {
    nombre: '',
    email: '',
    nota: '',
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        boxStyle: {
            height: 480,
        },
        addButton: {
            marginTop: 30,
        }
    }),
);

const FormStepTwo = ({ formValues, formTouched, formErrors }: FormStepOneProps) => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const telefonos = useSelector((state: RootState) => state.telefonos);
    const correos = useSelector((state: RootState) => state.correos);
    const [telefono, setTelefono] = useState<Telefono>(_telf);
    const [correo, setCorreo] = useState<Correo>(_mail);

    const handleNumero = (numero: string) => {
        setTelefono({ ...telefono, numero: numero });
    }

    const handleDireccion = (direccion: string) => {
        setCorreo({ ...correo, email: direccion });
    }

    const handleNombreTelf = (nombre: string) => {
        setTelefono({ ...telefono, nombre: nombre });
    }

    const handleNombreCorreo = (nombre: string) => {
        setCorreo({ ...correo, nombre: nombre });
    }

    const handleNotaTelf = (nota: string) => {
        setTelefono({ ...telefono, nota: nota });
    }

    const handleNotaCorreo = (nota: string) => {
        setCorreo({ ...correo, nota: nota });
    }

    const handleAddTelefono = () => {
        dispatch(telefonosActions.addTelefono(telefono));
        formValues.telefonos = [...formValues.telefonos, telefono];
        setTelefono(_telf);
    }

    const handleAddCorreo = () => {
        dispatch(correosActions.addCorreo(correo));
        formValues.correos = [...formValues.correos, correo];
        setCorreo(_mail);
    }



    return (
        <Box sx={{ flexGrow: 1 }} className={classes.boxStyle}>
            <Grid container spacing={10}>
                <Grid item xs={8}>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <h3>Añadir Teléfono</h3>
                            <TextField
                                fullWidth
                                id="nombreTelefono"
                                name="nombreTelefono"
                                label="Nombre"
                                value={telefono.nombre}
                                onChange={(e) => handleNombreTelf(e.target.value)}
                                error={formTouched.telefonos && Boolean(formErrors.telefonos)}
                                helperText={formTouched.telefonos && formErrors.telefonos}
                            />
                            <TextField
                                fullWidth
                                id="telefono"
                                name="telefono"
                                label="Teléfono"
                                value={telefono.numero}
                                onChange={(e) => handleNumero(e.target.value)}
                                error={formTouched.telefonos && Boolean(formErrors.telefonos)}
                                helperText={formTouched.telefonos && formErrors.telefonos}
                            />
                            <TextField
                                fullWidth
                                id="notaTelefono"
                                name="notaTelefono"
                                label="Nota"
                                value={telefono.nota}
                                onChange={(e) => handleNotaTelf(e.target.value)}
                                error={formTouched.telefonos && Boolean(formErrors.telefonos)}
                                helperText={formTouched.telefonos && formErrors.telefonos}
                            />
                            <Button variant="contained" id="attach_phone_button" className={classes.addButton} onClick={() => handleAddTelefono()}>Adjuntar</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>Añadir Correo</h3>
                            <TextField
                                fullWidth
                                id="nombreCorreo"
                                name="nombreCorreo"
                                label="Nombre"
                                value={correo.nombre}
                                onChange={(e) => handleNombreCorreo(e.target.value)}
                                error={formTouched.correos && Boolean(formErrors.correos)}
                                helperText={formTouched.correos && formErrors.correos}
                            />
                            <TextField
                                fullWidth
                                type="email"
                                id="email"
                                name="email"
                                label="Email"
                                value={correo.email}
                                onChange={(e) => handleDireccion(e.target.value)}
                                error={formTouched.correos && Boolean(formErrors.correos)}
                                helperText={formTouched.correos && formErrors.correos}
                            />
                            <TextField
                                fullWidth
                                id="notaCorreo"
                                name="notaCorreo"
                                label="Nota"
                                value={correo.nota}
                                onChange={(e) => handleNotaCorreo(e.target.value)}
                                error={formTouched.correos && Boolean(formErrors.correos)}
                                helperText={formTouched.correos && formErrors.correos}
                            />
                            <Button variant="contained" id="attach_email_button" className={classes.addButton} onClick={() => handleAddCorreo()}>Adjuntar</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <h2>Datos adjuntos</h2>
                    {telefonos.map((telf, idx) =>
                        <Item key={idx}>{telf.nombre} · {telf.numero}</Item>
                    )}
                    {correos.map((mail, idx) =>
                        <Item key={idx}>{mail.nombre} · {mail.email}</Item>
                    )}
                </Grid>
            </Grid>
        </Box>
    )

}

export default FormStepTwo;