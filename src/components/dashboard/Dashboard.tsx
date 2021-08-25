import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../services/Auth';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import Sidebar from '../sidebar/Sidebar';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ShareIcon from '@material-ui/icons/Share';

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

    let history = useHistory();

    const handleLogout = () => {
        logOut();
        history.push('/login');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" noWrap className={classes.title}>
                        Contactos
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
