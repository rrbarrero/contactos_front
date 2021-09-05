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
import { colectivoActions, paisActions, provinciaActions, subColectivoActions, tratamientoActions } from '../../store/actions';
import { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import moment from 'moment';


//moment.locale("es");

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

    const tratamientos = useSelector((state: RootState) => state.tratamientos);
    const provincias = useSelector((state: RootState) => state.provincias);
    const paises = useSelector((state: RootState) => state.paises);
    const colectivos = useSelector((state: RootState) => state.colectivos);
    const subColectivos = useSelector((state: RootState) => state.subColectivos);
    

    const [selectedTratamiento, setSelectedTratamiento] = useState<Tratamiento>();
    const [selectedProvincia, setSelectedProvincia] = useState<Provincia>();
    const [selectedPais, setSelectedPais] = useState<Pais>();
    const [selectedColectivo, setSelectedColectivo] = useState<Colectivo>();
    const [selectedSubColectivo, setSelectedSubColectivo] = useState<SubColectivo>();
    const [cargoTerminado, setCargoTerminado] = useState(false);
    const [fechaCese, setFechaCese] = useState(new Date());

    useEffect(() => {
        dispatch(tratamientoActions.get_all_tratamientos());
    }, [dispatch]);

    useEffect(() => {
        dispatch(provinciaActions.get_all_provincias());
    }, [dispatch]);

    useEffect(() => {
        dispatch(paisActions.get_all_paises());
    }, [dispatch]);

    useEffect(() => {
        dispatch(colectivoActions.get_all_colectivos);
    }, [dispatch]);

    useEffect(()=>{
        if(selectedColectivo){
            dispatch(subColectivoActions.get_subcolectivos(selectedColectivo));
        }
    },[selectedColectivo, dispatch]);

    let initialValues: Cargo = {
        persona: {
            tratamiento: {nombre:''},
            nombre: '',
            apellidos: ''
        },
        cargo: '',
        finalizado: false,
        ciudad: '',
        codPostal: '',
        direccion: '',
        provincia: {nombre: ''},
        pais: {nombre: ''},
        empresa: '',
        fechaAlta: new Date(),
        colectivo: {nombre: ''},
        subcolectivo: { nombre: '', colectivo: { nombre: '' } },

    }

    const handleChangeTratamiento = (e: unknown) => {
        const tratamiento: Tratamiento | undefined = tratamientos.find(tr => tr.id === e as number);
        setSelectedTratamiento(tratamiento);
        console.log(selectedPais);
    };

    const handleChangeProvincia = (e: unknown) => {
        const provincia: Provincia | undefined = provincias.find(pr => pr.id === e as number);
        setSelectedProvincia(provincia);
    };

    const handleChangePais = (e: unknown) => {
        const pais: Pais | undefined = paises.find(pa => pa.id === e as number);
        setSelectedPais(pais);
        console.log(selectedTratamiento);
    };

    const handleChangeColectivo = (e: unknown) => {
        const colectivo: Colectivo | undefined = colectivos.find(co => co.id === e as number);
        setSelectedColectivo(colectivo);
    };

    const handleChangeSubColectivo = (e: unknown) => {
        const subColectivo: SubColectivo | undefined = subColectivos.find(su => su.id === e as number);
        setSelectedSubColectivo(subColectivo);
    };

    const handleChangeCargoTerminado = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCargoTerminado(event.target.checked);
    };

    const renderSelectedTratamiento = () => {
        return selectedTratamiento?.nombre;
    }

    const renderSelectedProvincia = () => {
        return selectedProvincia?.nombre;
    }

    const renderSelectedPais = () => {
        return selectedPais?.nombre;
    }

    const renderSelectedColectivo = () => {
        return selectedColectivo?.nombre;
    }

    const renderSelectedSubColectivo = () => {
        return selectedSubColectivo?.nombre;
    }

    return (
        <>
            <Dashboard></Dashboard>
            <Box className={classes.box}>
                <div></div>
                <Formik
                    initialValues={initialValues}
                    //validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        values.fechaAlta = new Date();
                        if (selectedTratamiento) {
                            values.persona.tratamiento = { ...selectedTratamiento };
                        }
                        values.finalizado = cargoTerminado;
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

                                <Grid container spacing={2}>
                                    <Grid item md={2} xs={12}>
                                        <InputLabel id="tratamiento-select-label">Tratamiento</InputLabel>
                                        <Select
                                            labelId="tratamiento-select-label"
                                            id="tratamiento"
                                            input={<Input />}
                                            value={values.persona.tratamiento.id}
                                            onChange={(e) => handleChangeTratamiento(e.target.value)}
                                            renderValue={renderSelectedTratamiento}
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
                                            label="Dirección"
                                            value={values.direccion}
                                            onChange={handleChange}
                                            error={touched.direccion && Boolean(errors.direccion)}
                                            helperText={touched.direccion && errors.direccion}
                                        />
                                    </Grid>
                                    <Grid item md={2} xs={12}>
                                        <InputLabel id="provincia-select-label">Provincia</InputLabel>
                                        <Select
                                            labelId="provincia-select-label"
                                            id="provincia"
                                            input={<Input />}
                                            value={values.provincia.id}
                                            onChange={(e) => handleChangeProvincia(e.target.value)}
                                            renderValue={renderSelectedProvincia}
                                            defaultValue={provincias.length > 0 ? provincias[0].id : 0}
                                        >
                                            {provincias.map((provincia) =>
                                                <MenuItem key={provincia.id} value={provincia.id}>
                                                    {provincia.nombre}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </Grid>
                                    <Grid item md={2} xs={12}>
                                        <InputLabel id="pais-select-label">Pais</InputLabel>
                                        <Select
                                            labelId="pais-select-label"
                                            id="pais"
                                            input={<Input />}
                                            value={values.pais.id}
                                            onChange={(e) => handleChangePais(e.target.value)}
                                            renderValue={renderSelectedPais}
                                            defaultValue={paises.length > 0 ? paises[0].id : 0}
                                        >
                                            {paises.map((pais) =>
                                                <MenuItem key={pais.id} value={pais.id}>
                                                    {pais.nombre}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </Grid>
                                    <Grid item md={2} xs={12}>
                                        <InputLabel id="colectivo-select-label">Colectivo</InputLabel>
                                        <Select
                                            labelId="colectivo-select-label"
                                            id="colectivo"
                                            input={<Input />}
                                            value={values.colectivo.id}
                                            onChange={(e) => handleChangeColectivo(e.target.value)}
                                            renderValue={renderSelectedColectivo}
                                            defaultValue={colectivos.length > 0 ? colectivos[0].id : 0}
                                        >
                                            {colectivos.map((colectivo) =>
                                                <MenuItem key={colectivo.id} value={colectivo.id}>
                                                    {colectivo.nombre}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </Grid>
                                    <Grid item md={2} xs={12}>
                                        <InputLabel id="subcolectivo-select-label">SubColectivo</InputLabel>
                                        <Select
                                            labelId="subcolectivo-select-label"
                                            id="subcolectivo"
                                            input={<Input />}
                                            value={values.subcolectivo ? values.subcolectivo.id : 0}
                                            onChange={(e) => handleChangeSubColectivo(e.target.value)}
                                            renderValue={renderSelectedSubColectivo}
                                            defaultValue={subColectivos.length > 0 ? subColectivos[0].id : 0}
                                        >
                                            {subColectivos.map((subColectivo) =>
                                                <MenuItem key={subColectivo.id} value={subColectivo.id}>
                                                    {subColectivo.nombre}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </Grid>
                                </Grid>
                                <FormControlLabel control={<Checkbox
                                    checked={cargoTerminado}
                                    onChange={handleChangeCargoTerminado}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />} label="Cargo terminado" />

                                <TextField
                                    id="date"
                                    label="Fecha de cese"
                                    type="date"
                                    value={values.fechaCese}
                                    defaultValue={fechaCese}
                                    className={classes.dateField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />

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