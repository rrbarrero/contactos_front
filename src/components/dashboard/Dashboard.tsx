import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../services/Auth';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Sidebar from '../sidebar/Sidebar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
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
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Contactos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar />
            <p>Secret Page</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
};

export default Dashboard;
