import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import Sidebar from '../sidebar/Sidebar';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ColectivoDropdown from './ColectivoDropdown';
import { userActions } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { Link, useLocation } from 'react-router-dom';
import SearchBox from './SearchBox';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            textAlign: "left",
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        title: {
            flexGrow: 1,
            paddingLeft: drawerWidth
        },
        headerLink: {
            color: 'white',
            textDecoration: 'none',
        }
    }),
);


const Dashboard = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector((state: RootState) => state.authentication);
    const location = useLocation();
    const nombre = useSelector((state: RootState) => state.cargo.persona.nombre);
    const apellidos = useSelector((state: RootState) => state.cargo.persona.apellidos);

    const GetTitle = () => {
        switch (location.pathname) {
            case '/nuevo_contacto':
                return `Nuevo contacto: ${nombre} ${apellidos}`
            default:
                return "Contactos"
        }
    }

    const handleLogout = () => {
        dispatch(userActions.logout(user));
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" noWrap className={classes.title}>
                        <Link className={classes.headerLink} to="/contactos"> {GetTitle()} </Link>
                    </Typography>
                    {location.pathname === '/contactos' && <SearchBox />}
                    {location.pathname === '/contactos' && <ColectivoDropdown />}
                    <Typography variant="h4" noWrap>
                        {/* {user?.username} */}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}><ExitIcon /> Salir</Button>
                </Toolbar>
            </AppBar>
            <Sidebar />
            <p>Secret Page</p>
        </div>
    )
};

export default Dashboard;
