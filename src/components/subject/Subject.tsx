import * as React from "react";
import {
    createStyles,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

interface SubjectProps {
    name: string;
    children?: React.ReactNode;
    expanded: string | false;
    handleChange: (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
    disabled?: boolean;
}

export default function Subject(props: SubjectProps) {
    const classes = useStyles();
    const {name, children, expanded, handleChange, disabled} = props;

    return (
        <ExpansionPanel expanded={expanded === name} onChange={handleChange(name)} id={name} disabled={disabled ?? false}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`${name}-bh-content`}
                id={`${name}-bh-header`}
            >
                <Typography className={classes.heading}>{name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}