import React from 'react';
import './App.css';
import {Box, WithStyles} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Layout from "./Layout";
import {styles} from './styles';
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

function App(props: WithStyles<typeof styles>) {
    const {classes} = props;

    return (
        <Router>
            <Layout classes={classes}>
                <Switch>
                    <Route path="/" exact>
                        <Box my={2}>
                            {[...new Array(12)]
                                .map(
                                    () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                                )
                                .join('\n')}
                        </Box>
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}

export default withStyles(styles)(App);