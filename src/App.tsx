import React from 'react';
import './App.css';
import {createMuiTheme, WithStyles} from '@material-ui/core';
import {withStyles, ThemeProvider} from '@material-ui/core/styles';
import Layout from "./components/Layout";
import {styles} from './components/styles';
import {Route, Switch} from 'react-router';
import Calculator from "./components/calculator/Calculator";
import {ReactCookieProps, withCookies} from 'react-cookie';
import {compose} from 'redux';
import Home from "./components/home/Home";
import SummariesContainer from "./components/summaries/Summaries";
import Subjects from "./components/subject/Subjects";

const theme = createMuiTheme();

function App(props: WithStyles<typeof styles> & ReactCookieProps) {
    const {classes} = props;

    return (
        <ThemeProvider theme={theme}>
            <Layout classes={classes}>
                <Switch>
                    <Route path="/" exact>
                        <Home classes={classes} cookies={props.cookies}/>
                    </Route>
                    <Route path="/calculator">
                        <Calculator classes={classes} cookies={props.cookies}/>
                    </Route>
                    <Route path="/summaries">
                        <SummariesContainer component="Summaries" classes={classes}/>
                    </Route>
                    <Route path="/subjects">
                        <Subjects/>
                    </Route>
                </Switch>
            </Layout>
        </ThemeProvider>
    );
}

export default compose(
    withCookies,
    withStyles(styles)
)(App) as any;