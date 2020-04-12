import React from 'react';
import './App.css';
import {WithStyles} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Layout from "./components/Layout";
import {styles} from './components/styles';
import {Route, Switch} from 'react-router';
import Calculator from "./components/calculator/Calculator";
import {ReactCookieProps, withCookies} from 'react-cookie';
import {compose} from 'redux';
import Home from "./components/home/Home";

function App(props: WithStyles<typeof styles> & ReactCookieProps) {
    const {classes} = props;

    return (
            <Layout classes={classes}>
                <Switch>
                    <Route path="/" exact>
                        <Home classes={classes} cookies={props.cookies}/>
                    </Route>
                    <Route path="/calculator">
                        <Calculator classes={classes} cookies={props.cookies}/>
                    </Route>
                </Switch>
            </Layout>
    );
}

export default compose(
    withCookies,
    withStyles(styles)
)(App) as any;