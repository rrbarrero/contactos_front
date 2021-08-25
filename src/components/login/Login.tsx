import React from 'react';
import './Login.css';
import Button from '@material-ui/core/Button';
import { Box, FilledInput, IconButton, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import "@fontsource/ubuntu-condensed"
import { Login } from '../../services/Login';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        h1Style: {
            fontFamily: "Ubuntu Condensed",
            fontSize: '58px',
        },
        textField: {
            width: '25ch',
        },
        gridStyle: {
            marginTop: '10%',
        },
        boxStyle: {
            padding: '2rem',
            backgroundColor: 'white',
        },
        submitStyle: {
            marginTop: '2rem',
        }
    }),
);

interface Credentials {
    email: string;
    password: string;
    showPassword: boolean;
}

const Landing = () => {

    let history = useHistory();

    const [datos, setDatos] = React.useState<Credentials>({
        email: '',
        password: '',
        showPassword: false,
    });

    const classes = useStyles();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault()
        const username = datos.email.split('@')[0]
        Login(username, datos.password).then(() => {
            history.push("/dashboard");
        });
    }

    const handleChange = (prop: keyof Credentials) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatos({ ...datos, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setDatos({ ...datos, showPassword: !datos.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.gridStyle}>
            <Box boxShadow={3} borderRadius={5} className={classes.boxStyle}>
                <h1 className={classes.h1Style}>Contactos</h1>
                <p>Por favor, teclea tus credenciales para acceder.</p>
                <form onSubmit={handleLogin}>
                    <Grid item xs={12}>
                        <FormControl className={classes.margin}>
                            <TextField
                                id="outlined-basic"
                                type="email"
                                label="Email"
                                onChange={handleInputChange}
                                name="email"
                                variant="filled"
                                required
                                helperText="Tu dirección de correo corporativo" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                type={datos.showPassword ? 'text' : 'password'}
                                value={datos.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {datos.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit" className={classes.submitStyle}>Enviar</Button>
                </form>
            </Box>

        </Grid>
    )
};

export default Landing;
