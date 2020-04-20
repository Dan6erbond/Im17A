import * as React from "react";
import {createStyles, Grid, Theme} from "@material-ui/core";
import {Document, DocumentSpecs} from "./Document";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridListRoot: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

interface DocumentContainerProps {
    children?: DocumentSpecs[];
}

export default function DocumentContainer(props: DocumentContainerProps) {
    const classes = useStyles();
    const {children} = props;

    return (
        <div className={classes.gridListRoot}>
            {children && children.length > 0 ?
                <Grid container spacing={1} style={{width: '100%'}}>
                    {children.map((specs, index) =>
                        <Grid item sm={6} md={4} key={index} style={{width: '100%'}}>
                            <Document {...specs}/>
                        </Grid>)}
                </Grid> : null}
        </div>
    );
}