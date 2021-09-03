import { withStyles, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';
import { RootState } from "../../store/reducers";
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import { Link } from 'react-router-dom';

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: -10,
            // top: -5,
            border: `2px solid ${theme.palette.background.paper}`,
            // padding: '0 4px',
            fontSize: 24,
            padding: 12,
        },
    }),
)(Badge);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerLink: {
            color: 'black',
            textDecoration: 'none',
        }
    }),
);

const ContextualMenu = () => {
    const classes = useStyles();
    //const dispatch = useDispatch();
    const selectedCargo = useSelector((state: RootState) => state.selectedCargo);

    //const chipTxt = `Seleccionados ${selectedCargo.length}`;

    return (
        <>
            <StyledBadge color="primary" badgeContent={selectedCargo.length} >
                <PersonIcon style={{ fontSize: 40 }} />
            </StyledBadge>
            <List component="nav" aria-label="main mailbox folders">
                <Link to="/nuevo_contacto" className={classes.headerLink}>
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Nuevo" />
                    </ListItem>
                </Link>
                <Divider />
                {selectedCargo.length === 1 &&

                    <ListItem button>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Modificar" />
                    </ListItem>
                }
                {selectedCargo.length === 1 &&
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Añadir cargo" />
                    </ListItem>
                }
                <Divider />
                {selectedCargo.length > 0 &&
                    <ListItem button>
                        <ListItemIcon>
                            <PlaylistAddCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Añadir a lista..." />
                    </ListItem>
                }
                <Divider />
                {selectedCargo.length > 0 &&
                    <ListItem button>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Enviar correo..." />
                    </ListItem>
                }
                <Divider />
                {selectedCargo.length > 0 &&
                    <ListItem button>
                        <ListItemIcon>
                            <AlarmOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Finalizar cargo" />
                    </ListItem>
                }
                <Divider />
                {selectedCargo.length > 0 &&
                    <ListItem button>
                        <ListItemIcon>
                            <DeleteForeverIcon />
                        </ListItemIcon>
                        <ListItemText primary="Eliminar..." />
                    </ListItem>
                }
            </List>


        </>
    )
}

export default ContextualMenu;