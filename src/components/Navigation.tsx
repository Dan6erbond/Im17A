import * as React from "react";
import {Link} from "react-router-dom";
import {styles} from './styles';
import {
    AppBar, Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon, ListItemSecondaryAction,
    ListItemText,
    SwipeableDrawer,
    Toolbar,
    Typography,
    WithStyles
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import FunctionsIcon from '@material-ui/icons/Functions';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import BookIcon from '@material-ui/icons/Book';
import {ExpandLess, ExpandMore} from "@material-ui/icons";

export default function Navigation(props: WithStyles<typeof styles>) {
    const {classes} = props;

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [subjectsCollapseOpen, setSubjectsCollapseOpen] = React.useState(false);
    const [booksCollapseOpen, setBooksCollapseOpen] = React.useState(false);

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    <IconButton onClick={() => setDrawerOpen(true)} edge="start" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title} component={Link} to="/">
                        Im17A
                    </Typography>
                    <div className={classes.grow}/>
                </Toolbar>
            </AppBar>

            <Toolbar id="back-to-top-anchor"/>

            <SwipeableDrawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onOpen={() => setDrawerOpen(true)}
            >
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="Im17A" classes={{primary: classes.drawerTitle}}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button component={Link} to="/subjects">
                        <ListItemIcon><FolderIcon/></ListItemIcon>
                        <ListItemText>Fächer</ListItemText>
                        <ListItemSecondaryAction onClick={() => setSubjectsCollapseOpen(!subjectsCollapseOpen)}>
                            <IconButton edge="end" aria-label="expand">
                                {subjectsCollapseOpen ? <ExpandLess/> : <ExpandMore/>}
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={subjectsCollapseOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {["Französisch", "Deutsch", "Englisch", "Finanz- und Rechnungswesen", "Informatik", "Mathematik", "Wirtschaft und Recht"].map((s,i) =>
                                <ListItem button component={Link} to={`/subjects/${s}`} className={classes.nested} key={i}>
                                    <ListItemText>{s}</ListItemText>
                                </ListItem>)}
                        </List>
                    </Collapse>
                    <ListItem button component={Link} to="/books">
                        <ListItemIcon><BookIcon/></ListItemIcon>
                        <ListItemText>Bücher</ListItemText>
                        <ListItemSecondaryAction onClick={() => setBooksCollapseOpen(!booksCollapseOpen)}>
                            <IconButton edge="end" aria-label="expand">
                                {subjectsCollapseOpen ? <ExpandLess/> : <ExpandMore/>}
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={booksCollapseOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {["Englisch"].map((s,i) =>
                                <ListItem button component={Link} to={`/books/${s}`} className={classes.nested} key={i}>
                                    <ListItemText>{s}</ListItemText>
                                </ListItem>)}
                        </List>
                    </Collapse>
                    <ListItem button component={Link} to="/summaries">
                        <ListItemIcon><DescriptionIcon/></ListItemIcon>
                        <ListItemText>Zusammenfassungen</ListItemText>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button component={Link} to="/calculator">
                        <ListItemIcon><FunctionsIcon/></ListItemIcon>
                        <ListItemText>Notenrechner</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </React.Fragment>
    );
}