import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import Sidebar from '../sidebar/Sidebar';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ColectivoDropdown from './ColectivoDropdown';
import { history } from "../../helpers/";
import { colectivoActions, userActions } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { useEffect } from 'react';

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
        }
    }),
);


const Dashboard = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.authentication.user);
    const colectivo = useSelector((state: RootState) => state.colectivo);

    useEffect(() => {
        if (user?.token) {
            dispatch(colectivoActions.get_one(86));
        }
    }, []);

    const handleLogout = () => {
        dispatch(userActions.logout());
        history.push('/login');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" noWrap className={classes.title}>
                        Contactos
                    </Typography>
                    <ColectivoDropdown />
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
