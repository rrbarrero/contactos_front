import 'react-app-polyfill/ie11';
import { FormikErrors, FormikTouched } from 'formik';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/reducers";
import { cargoActions } from '../../store/actions';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectPais from './formFields/SelectPais';
import SelectColectivo from './formFields/SelectColectivo';
import moment from 'moment';
import SelectSubColectivo from './formFields/SelectSubColectivo';
import SelectTratamiento from './formFields/SelectTratamiento';
import SelectProvincia from './formFields/SelectProvincia';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

type FormStepOneProps = {
    classes: ClassNameMap,
    formValues: Cargo,
    formTouched: FormikTouched<Cargo>
    formErrors: FormikErrors<Cargo>,
    handleBlur: any,
}

const FormStepOne = ({ classes, formValues, formTouched, formErrors, handleBlur }: FormStepOneProps) => {

    const dispatch = useDispatch();

    const nombre = useSelector((state: RootState) => state.cargo.persona.nombre);
    const apellidos = useSelector((state: RootState) => state.cargo.persona.apellidos);
    const cargo = useSelector((state: RootState) => state.cargo.cargo);
    const empresa = useSelector((state: RootState) => state.cargo.empresa);
    const finalizado = useSelector((state: RootState) => state.cargo.finalizado);
    const direccion = useSelector((state: RootState) => state.cargo.direccion);
    const ciudad = useSelector((state: RootState) => state.cargo.ciudad);

    // TODO: PASAR A REDUX
    const [fechaCese, setFechaCese] = useState(moment().format('yyyy-MM-DD'));

    const handleChangeFinalizado = (e: boolean) => {
        dispatch(cargoActions.setFinalizado(e));
    };

    const handleChangeNombre = (nombre: string, formValues: Cargo) => {
        dispatch(cargoActions.setPersonaNombre(nombre));
        formValues.persona.nombre = nombre;
    }

    const handleChangeApellidos = (apellidos: string, formValues: Cargo) => {
        dispatch(cargoActions.setPersonaApellidos(apellidos));
        formValues.persona.apellidos = apellidos;
    }

    const handleChangeCargo = (cargoCargo: string, formValues: Cargo) => {
        dispatch(cargoActions.setCargo(cargoCargo));
        formValues.cargo = cargoCargo;
    }

    const handleChangeEmpresa = (empresa: string, formValues: Cargo) => {
        dispatch(cargoActions.setEmpresa(empresa));
        formValues.empresa = empresa;
    }

    const handleChangeCiudad = (ciudad: string, formValues: Cargo) => {
        dispatch(cargoActions.setCiudad(ciudad));
        formValues.ciudad = ciudad;
    }

    const handleChangeDireccion = (direccion: string, formValues: Cargo) => {
        dispatch(cargoActions.setDireccion(direccion));
        formValues.direccion = direccion;
    }

    const handleChangeFechaCese = (fechaCese: string, formValues: Cargo) => {
        dispatch(cargoActions.setFechaCese(fechaCese));
        formValues.fechaCese = fechaCese;
    }


    return (
        <Grid container spacing={2}>
            <SelectTratamiento classes={classes} cargoValues={formValues} />
            <Grid item md={3} xs={12} className={classes.inputItem}>
                <TextField
                    fullWidth
                    id="nombre"
                    name="persona.nombre"
                    label="Nombre"
                    value={nombre}
                    onChange={(e) => handleChangeNombre(e.target.value, formValues)}
                    onBlur={handleBlur}
                    error={formTouched.persona?.nombre && Boolean(formErrors.persona?.nombre)}
                    helperText={formTouched.persona?.nombre && formErrors.persona?.nombre}
                />
            </Grid>
            <Grid item md={4} xs={12} className={classes.inputItem}>
                <TextField
                    fullWidth
                    id="apellidos"
                    name="persona.apellidos"
                    label="Apellidos"
                    value={apellidos}
                    onChange={(e) => handleChangeApellidos(e.target.value, formValues)}
                    onBlur={handleBlur}
                    error={formTouched.persona?.apellidos && Boolean(formErrors.persona?.apellidos)}
                    helperText={formTouched.persona?.apellidos && formErrors.persona?.apellidos}
                />
            </Grid>
            <Grid item md={4} xs={12} className={classes.inputItem}>
                <TextField
                    fullWidth
                    id="cargo"
                    name="cargo"
                    label="Cargo"
                    value={cargo}
                    onChange={(e) => handleChangeCargo(e.target.value, formValues)}
                    onBlur={handleBlur}
                    error={formTouched.cargo && Boolean(formErrors.cargo)}
                    helperText={formTouched.cargo && formErrors.cargo}
                />
            </Grid>
            <Grid item md={4} xs={12} className={classes.inputItem}>
                <TextField
                    fullWidth
                    id="empresa"
                    name="empresa"
                    label="Empresa"
                    value={empresa}
                    onChange={(e) => handleChangeEmpresa(e.target.value, formValues)}
                    onBlur={handleBlur}
                    error={formTouched.empresa && Boolean(formErrors.empresa)}
                    helperText={formTouched.empresa && formErrors.empresa}
                />
            </Grid>
            <Grid item md={5} xs={12} className={classes.inputItem}>
                <TextField
                    fullWidth
                    id="direccion"
                    name="direccion"
                    label="Dirección"
                    value={direccion}
                    onChange={(e) => handleChangeDireccion(e.target.value, formValues)}
                    onBlur={handleBlur}
                    error={formTouched.direccion && Boolean(formErrors.direccion)}
                    helperText={formTouched.direccion && formErrors.direccion}
                />
            </Grid>
            <Grid item md={3} xs={12} className={classes.inputItem}>
                <TextField
                    fullWidth
                    id="ciudad"
                    name="ciudad"
                    label="Ciudad"
                    value={ciudad}
                    onChange={(e) => handleChangeCiudad(e.target.value, formValues)}
                    onBlur={handleBlur}
                    error={formTouched.ciudad && Boolean(formErrors.ciudad)}
                    helperText={formTouched.ciudad && formErrors.ciudad}
                />
            </Grid>
            <SelectProvincia classes={classes} cargoValues={formValues} />
            <SelectPais classes={classes} cargoValues={formValues} />
            <SelectColectivo classes={classes} cargoValues={formValues} />
            <SelectSubColectivo classes={classes} cargoValues={formValues} />
            <Grid item md={5} xs={12} className={classes.inputItem}>
                <FormControlLabel control={
                    <Checkbox
                        checked={finalizado}
                        onChange={(e) => handleChangeFinalizado(e.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />} label="Cargo terminado" />
            </Grid>
            <Grid item md={5} xs={12} className={classes.inputItem}>
                {finalizado && <TextField
                    id="date"
                    label="Fecha de cese"
                    type="date"
                    value={fechaCese}
                    onChange={(e) => handleChangeFechaCese(e.target.value, formValues)}
                    //defaultValue={fechaCese}
                    className={classes.dateField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />}
            </Grid>
        </Grid>
    );
}

export default FormStepOne;