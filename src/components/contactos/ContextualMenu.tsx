import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DraftsIcon from '@material-ui/icons/Drafts';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/reducers";
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

const ContextualMenu = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedCargo = useSelector((state: RootState) => state.selectedCargo);

    const chipTxt = `Seleccionados ${selectedCargo.length}`;

    return (
        <>
            <Badge color="secondary" badgeContent={selectedCargo.length} showZero>
                <PersonIcon style={{ fontSize: 40 }} />
            </Badge>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Nuevo" />
                </ListItem>
                <Divider />
                {selectedCargo.length === 1 &&
                    <ListItem button>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Modificar" />
                    </ListItem>
                }
                {selectedCargo.length > 0 &&
                    <ListItem button>
                        <ListItemIcon>
                            <PlaylistAddCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Añadir a lista..." />
                    </ListItem>
                }
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