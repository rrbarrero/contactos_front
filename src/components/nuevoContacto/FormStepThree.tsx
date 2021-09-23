import {
    makeStyles,
    Theme,
    createStyles,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Grid,
} from "@material-ui/core";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import WorkIcon from '@material-ui/icons/Work';
import PublicIcon from '@material-ui/icons/Public';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import { useEffect } from "react";
import { appActions } from "../../store/actions";
import { useDispatch } from "react-redux";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ListStyle: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: 'background.paper'
        },
        column: {
            marginLeft: '5%',
        }
    }),
);

type StepThreeProps = {
    formValues: Cargo,
}

const FormStepThree = ({ formValues }: StepThreeProps) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appActions.setAppTitle("Resumen, nuevo Contacto:"));
    }, [dispatch])


    return (
        <Grid container spacing={2}>
            <Grid item md={5} xs={12} className={classes.column}>
                <List className={classes.ListStyle}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                formValues.persona.tratamiento.nombre + " " + formValues.persona.nombre + " " + formValues.persona.apellidos
                            }
                            secondary={formValues.cargo + " · " + formValues.empresa}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <LocationOnIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={formValues.ciudad} secondary={formValues.provincia.nombre} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AccountTreeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={formValues.colectivo.nombre} secondary={formValues.subcolectivo.nombre} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PublicIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={formValues.pais.nombre} secondary="" />
                    </ListItem>
                </List>
            </Grid>
            <Grid item md={5} xs={12} className={classes.column}>
                <List className={classes.ListStyle}>
                    {formValues.telefonos.map((telefono) =>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PhoneIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    telefono.numero
                                }
                                secondary={telefono.nombre}
                            />
                        </ListItem>
                    )}

                    {formValues.correos.map((correo) =>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MailIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    correo.email
                                }
                                secondary={correo.nombre}
                            />
                        </ListItem>
                    )}
                </List>
            </Grid>
        </Grid>


    )
}

export default FormStepThree;

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
