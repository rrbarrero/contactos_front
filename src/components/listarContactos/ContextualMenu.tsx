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
import anime from 'animejs';
import { Fragment, useEffect, useRef } from 'react';

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

type getListProps = {
    url: string;
    icon: JSX.Element;
    label: string;
}

const GetListItem = ({ url, icon, label }: getListProps) => {
    const classes = useStyles();
    return (
        <Link to={url} className={classes.headerLink}>
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItem>
        </Link>
    )
}

const ContextualMenu = () => {
    const selectedCargos = useSelector((state: RootState) => state.appStates.selectedCargos);

    let menuItems: JSX.Element[] = [];

    menuItems.push(
        <GetListItem url="/nuevo_contacto" icon={<AddIcon />} label={"Nuevo"} />
    );

    if (selectedCargos.length === 1) {
        menuItems.push(
            <GetListItem url="#" icon={<EditIcon />} label={"Modificar..."} />,
            <GetListItem url="#" icon={<AddIcon />} label={"Añadir cargo"} />,
            <Divider />,
        );
    }
    if (selectedCargos.length > 1) {
        menuItems.push(
            <GetListItem url="#" icon={<PlaylistAddCheckIcon />} label={"Añadir a lista..."} />,
            <Divider />,
            <GetListItem url="#" icon={<MailIcon />} label={"Enviar correo..."} />,
            <Divider />,
            <GetListItem url="#" icon={<AlarmOnIcon />} label={"Finalizar cargo..."} />,
            <Divider />,
            <GetListItem url="#" icon={<DeleteForeverIcon />} label={"Eliminar..."} />,
        )
    }

    return (
        <>
            <StyledBadge color="primary" badgeContent={selectedCargos.length} >
                <PersonIcon style={{ fontSize: 40 }} />
            </StyledBadge>
            <List id="context-options-list" component="nav" aria-label="main mailbox fol  ders">
                {menuItems.map((item, index) => (
                    <Fragment key={index}>
                        {item}
                    </Fragment>
                ))}
            </List>
        </>
    )
}

export default ContextualMenu;