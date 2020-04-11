import * as React from "react";
import {Container, CssBaseline, Fab, WithStyles} from "@material-ui/core";
import {styles} from './styles';
import Navigation from "./Navigation";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from "./ScrollTop";

interface LayoutProps {
    children?: React.ReactNode;
}

export default function Layout(props: LayoutProps & WithStyles<typeof styles>){
    const {classes} = props;

    return (
        <React.Fragment>
            <CssBaseline/>

            <Navigation classes={classes} />

            <Container maxWidth="md">
                {props.children}
            </Container>

            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}