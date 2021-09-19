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
import { motion } from "framer-motion";
import { Fragment } from 'react';

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

type menuItem = {
    url: string;
    icon: JSX.Element;
    label: string;
}


const ContextualMenu = () => {
    const classes = useStyles();
    const selectedCargos = useSelector((state: RootState) => state.appStates.selectedCargos);
    let menuItems: menuItem[] = [];

    menuItems.push({ url: "/nuevo_contacto", icon: <AddIcon />, label: "Nuevo" });

    if (selectedCargos.length === 1) {
        menuItems.push(
            { url: "#", icon: <EditIcon />, label: "Modificar..." },
            { url: "#", icon: <AddIcon />, label: "Añadir cargo" }
        );
    }
    if (selectedCargos.length > 1) {
        menuItems.push(
            { url: "#", icon: <PlaylistAddCheckIcon />, label: "Añadir a lista..." },
            { url: "#", icon: <MailIcon />, label: "Enviar correo..." },
            { url: "#", icon: <AlarmOnIcon />, label: "Finalizar cargo..." },
            { url: "#", icon: <DeleteForeverIcon />, label: "Eliminar..." },
        )
    }

    return (
        <>
            <StyledBadge color="primary" badgeContent={selectedCargos.length} >
                <PersonIcon style={{ fontSize: 40 }} />
            </StyledBadge>
            <List id="context-options-list" component="nav" aria-label="main mailbox fol  ders">
                {menuItems.map((item, index) => (
                    <motion.div animate={{ x: [400, 0], opacity: [0, 1] }} transition={{ duration: 0.5 + index * 0.1 }} >
                        <Link to={item.url} className={classes.headerLink}>
                            <ListItem button>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        </Link>
                    </motion.div>
                ))}
            </List>
        </>
    )
}

export default ContextualMenu;