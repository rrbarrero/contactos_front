import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PeopleIcon from '@material-ui/icons/People';
import ListIcon from '@material-ui/icons/List';
import ShareIcon from '@material-ui/icons/Share';
import FolderIcon from '@material-ui/icons/Folder';
import FolderSharedIcon from '@material-ui/icons/FolderShared';



const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);

const Sidebar = () => {

    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button key={1} >
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Contactos" />
                </ListItem>
                <ListItem button key={1} >
                    <ListItemIcon><ListIcon /></ListItemIcon>
                    <ListItemText primary="Listas" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={1} >
                    <ListItemIcon><FolderIcon /></ListItemIcon>
                    <ListItemText primary="Colectivos" />
                </ListItem>
            </List>
            <List>
                <ListItem button key={1} >
                    <ListItemIcon><FolderSharedIcon /></ListItemIcon>
                    <ListItemText primary="SubColectivos" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={1} >
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary="Plantillas" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={1} >
                    <ListItemIcon><ShareIcon /></ListItemIcon>
                    <ListItemText primary="Acciones" />
                </ListItem>
            </List>
            <Divider />
        </Drawer>

    );

}

export default Sidebar;