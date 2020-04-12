import React from 'react';
import './App.css';
import {Box, WithStyles} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Layout from "./components/Layout";
import {styles} from './components/styles';
import {Route, Switch} from 'react-router';
import Calculator from "./components/calculator/Calculator";

function App(props: WithStyles<typeof styles>) {
    const {classes} = props;

    return (
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
                    <Route path="/calculator">
                        <Calculator classes={classes}/>
                    </Route>
                </Switch>
            </Layout>
    );
}

export default withStyles(styles)(App);