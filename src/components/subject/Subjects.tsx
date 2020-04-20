import * as React from "react";
import {createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Subject from "./Subject";
import DocumentContainer from "../documents/DocumentContainer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
    }),
);

export default function Subjects() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Subject name={"Französisch"} expanded={expanded} handleChange={handleChange}>
                <div>
                    <DocumentContainer children={[
                        {name: "Grammatik", path: "res/docs/french/franzoesisch_grammatik.pdf"},
                        {name: "Verben", path: "res/docs/french/verben_envol_buecher.pdf"},
                        {name: "Vokabular Relations Sociales", path: "res/docs/french/vocabulaire_relations_socialies_loisirs_vie_privee.pdf"},
                        {name: "Lösungen Cours Intensif 2", path: "res/docs/french/cours_intensif_2_l.pdf"}
                    ]}/>
                </div>
            </Subject>
        </div>
    );
};