import * as React from "react";
import {createStyles, Theme, Typography} from "@material-ui/core";
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
                <div style={{width: '100%'}}>
                    <DocumentContainer children={[
                        {name: "Grammatik", path: "res/docs/subjects/french/franzoesisch_grammatik.pdf"},
                        {name: "Verben", path: "res/docs/subjects/french/verben_envol_buecher.pdf"},
                        {name: "Vokabular Relations Sociales", path: "res/docs/subjects/french/vocabulaire_relations_socialies_loisirs_vie_privee.pdf"},
                        {name: "Lösungen Cours Intensif 2", path: "res/docs/subjects/french/cours_intensif_2_l.pdf"}
                    ]}/>
                </div>
            </Subject>
            <Subject name={"Deutsch"} expanded={expanded} handleChange={handleChange}>
                <div style={{width: '100%'}}>
                    <DocumentContainer children={[
                        {name: "Theorie", path: "res/docs/subjects/german/deutsch_theorie.pdf"},
                        {name: "Satzbau & Interpunktion", path: "res/docs/subjects/german/satzbau_interpunktion.pptx"}
                    ]}/>
                </div>
            </Subject>
            <Subject name={"Englisch"} expanded={expanded} handleChange={handleChange}>
                <div style={{width: '100%'}}>
                    <DocumentContainer children={[
                        {name: "Irregular Verbs", path: "res/docs/subjects/english/irregular_verbs.doc"},
                        {name: "Unit 1", path: "res/docs/subjects/english/unit_1.pdf"},
                        {name: "Vocabulary Exam 1", path: "res/docs/subjects/english/vocabulary_exam_1.docx"}
                    ]}/>
                </div>
            </Subject>
            <Subject name={"Finanz- und Rechnungswesen"} expanded={expanded} handleChange={handleChange}>
                <div style={{width: '100%'}}>
                    <DocumentContainer children={[
                        {name: "Theorie", path: "res/docs/subjects/finance/frw_theorie.pdf"}
                    ]}/>
                    <br/>
                    <Typography variant="h6" gutterBottom>
                        Lösungen
                    </Typography>
                    <DocumentContainer children={[
                        {name: "Beleg & Kontierung", path: "res/docs/subjects/finance/beleg_und_kontierung_fallstudie_l.pdf"},
                        {name: "Das Passivkonto", path: "res/docs/subjects/finance/das_passivkonto_l.pdf"},
                        {name: "Die Bilanz", path: "res/docs/subjects/finance/die_bilanz_l.pdf"},
                        {name: "Die Erfolgsrechnung", path: "res/docs/subjects/finance/die_erfolgsrechnung_l.pdf"},
                        {name: "Die Mehrwertsteuer", path: "res/docs/subjects/finance/die_mehrwertsteuer_l.pdf"},
                        {name: "Die Verbuchung von Geschäftsfällen", path: "res/docs/subjects/finance/die_verbuchung_von_geschaeftsfaellen.pdf"},
                        {name: "Die Verbuchung von Gewinn & Verlust", path: "res/docs/subjects/finance/die_verbuchung_von_gewinn_verlust_l.pdf"},
                        {name: "Die Warenkonten", path: "res/docs/subjects/finance/die_warenkonten_l.pdf"},
                        {name: "Kapitalerträge & Verrechnungssteuer", path: "res/docs/subjects/finance/kapitalertraege_verrechnungssteuer_l.pdf"},
                        {name: "Kontenrahmen & Kontenplan", path: "res/docs/subjects/finance/kontenrahmen_kontenplan_l.pdf"},
                        {name: "Spezielle Probleme", path: "res/docs/subjects/finance/spezielle_probleme_l.pdf"}
                    ]}/>
                </div>
            </Subject>
        </div>
    );
};