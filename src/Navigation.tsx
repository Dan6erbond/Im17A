import * as React from "react";
import {styles} from './styles';
import {
    AppBar,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
    Toolbar,
    Typography,
    WithStyles
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import FunctionsIcon from '@material-ui/icons/Functions';
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

interface NavigationState {
    drawerOpen: boolean;
}

export default class Navigation extends React.Component<WithStyles<typeof styles>, NavigationState> {
    constructor(props: WithStyles<typeof styles>) {
        super(props);
        this.state = {drawerOpen: false};

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }


    private toggleDrawer(open: boolean) {
        this.setState({drawerOpen: open});
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <AppBar>
                    <Toolbar>
                        <IconButton onClick={() => this.toggleDrawer(true)} edge="start" className={classes.menuButton}
                                    color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Im17A
                        </Typography>
                        <div className={classes.grow}/>
                        <Button color="inherit" component={Link} to="/">Startseite</Button>
                    </Toolbar>
                </AppBar>

                <Toolbar id="back-to-top-anchor"/>

                <SwipeableDrawer
                    anchor="left"
                    open={this.state.drawerOpen}
                    onClose={() => this.toggleDrawer(false)}
                    onOpen={() => this.toggleDrawer(true)}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemText primary="Im17A" classes={{primary: classes.drawerTitle}}/>
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
}