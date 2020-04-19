import * as React from "react";
import {Grid, WithStyles} from "@material-ui/core";
import {styles} from "../styles";

interface DocumentContainerProps {
    children?: React.ReactNode[];
}

export default function DocumentContainer (props: WithStyles<typeof styles> & DocumentContainerProps) {
    const {classes, children} = props;

    return (
        <div className={classes.gridListRoot}>
            {children && children.length > 0 ?
                <Grid container spacing={1}>
                    {children.map((component, index) =>
                            <Grid item sm={6} md={4} key={index} style={{width: '100%'}}>
                                {component}
                            </Grid>)}
                </Grid> : null}
        </div>
    );
}