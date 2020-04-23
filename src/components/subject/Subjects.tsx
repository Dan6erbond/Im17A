import * as React from "react";
import {Typography} from "@material-ui/core";
import Subject from "./Subject";
import DocumentContainer from "../documents/DocumentContainer";
import {RouteComponentProps} from "react-router";

interface SubjectsState {
    subject?: string;
    expanded: string | false;
}

interface SubjectsParams {
    subject?: string;
}

export default class Subjects extends React.Component<RouteComponentProps<SubjectsParams>, SubjectsState> {
    constructor(props: RouteComponentProps<SubjectsParams>) {
        super(props);

        const {subject} = props.match.params;
        this.state = {subject: subject, expanded: subject ? subject : false};

        this.setExpanded = this.setExpanded.bind(this);
    }

    static getDerivedStateFromProps(nextProps: RouteComponentProps<SubjectsParams>, prevState: SubjectsState) {
        let nextState = Object.assign({}, prevState);

        const {subject} = nextProps.match.params;
        if (subject && subject !== prevState.subject) {
            nextState.subject = subject;
            nextState.expanded = subject;
        }

        return nextState;
    }

    private setExpanded(expanded: string | false) {
        this.setState({expanded: expanded});
    }

    public render() {
        const {expanded} = this.state;

        const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
            this.setExpanded(isExpanded ? panel : false);
        };

        return (
            <div style={{width: '100%'}}>
                <Typography variant="h4" gutterBottom>
                    Fächer
                </Typography>
                <br/>
                <Subject name={"Französisch"} expanded={expanded} handleChange={handleChange}>
                    <div style={{width: '100%'}}>
                        <DocumentContainer children={[
                            {name: "Grammatik", path: "res/docs/subjects/french/franzoesisch_grammatik.pdf"},
                            {name: "Verben", path: "res/docs/subjects/french/verben_envol_buecher.pdf"},
                            {
                                name: "Vokabular Relations Sociales",
                                path: "res/docs/subjects/french/vocabulaire_relations_socialies_loisirs_vie_privee.pdf"
                            },
                            {name: "Lösungen Cours Intensif 2", path: "res/docs/subjects/french/cours_intensif_2_l.pdf"}
                        ]}/>
                    </div>
                </Subject>
                <Subject name={"Deutsch"} expanded={expanded} handleChange={handleChange}>
                    <div style={{width: '100%'}}>
                        <DocumentContainer children={[
                            {name: "Theorie", path: "res/docs/subjects/german/deutsch_theorie.pdf"},
                            {
                                name: "Satzbau & Interpunktion",
                                path: "res/docs/subjects/german/satzbau_interpunktion.pptx"
                            }
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
                            {name: "Theorie", path: "res/docs/subjects/finance/frw_theorie.pdf"},
                        ]}/>
                        <br/>
                        <Typography variant="h6" gutterBottom>
                            Abacus
                        </Typography>
                        <DocumentContainer children={[
                            {name: "Abacus", path: "res/docs/subjects/finance/abacus/abacus.pdf"},
                            {
                                name: "Abacus Zusammenfassung",
                                path: "res/docs/subjects/finance/abacus/abacus_zusammenfassung.pdf"
                            },
                            {name: "Kapitel 6", path: "res/docs/subjects/finance/abacus/abacus_2019_kap_6.pdf"}
                        ]}/>
                        <br/>
                        <Typography variant="h6" gutterBottom>
                            Lösungen
                        </Typography>
                        <DocumentContainer children={[
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/solutions/beleg_und_kontierung_fallstudie_l.pdf"
                            },
                            {
                                name: "Das Passivkonto",
                                path: "res/docs/subjects/finance/solutions/das_passivkonto_l.pdf"
                            },
                            {name: "Die Bilanz", path: "res/docs/subjects/finance/solutions/die_bilanz_l.pdf"},
                            {
                                name: "Die Erfolgsrechnung",
                                path: "res/docs/subjects/finance/solutions/die_erfolgsrechnung_l.pdf"
                            },
                            {
                                name: "Die Mehrwertsteuer",
                                path: "res/docs/subjects/finance/solutions/die_mehrwertsteuer_l.pdf"
                            },
                            {
                                name: "Die Verbuchung von Geschäftsfällen",
                                path: "res/docs/subjects/finance/solutions/die_verbuchung_von_geschaeftsfaellen_l.pdf"
                            },
                            {
                                name: "Die Verbuchung von Gewinn & Verlust",
                                path: "res/docs/subjects/finance/solutions/die_verbuchung_von_gewinn_verlust_l.pdf"
                            },
                            {
                                name: "Die Warenkonten",
                                path: "res/docs/subjects/finance/solutions/die_warenkonten_l.pdf"
                            },
                            {
                                name: "Kapitalerträge & Verrechnungssteuer",
                                path: "res/docs/subjects/finance/solutions/kapitalertraege_verrechnungssteuer_l.pdf"
                            },
                            {
                                name: "Kontenrahmen & Kontenplan",
                                path: "res/docs/subjects/finance/solutions/kontenrahmen_kontenplan_l.pdf"
                            },
                            {
                                name: "Spezielle Probleme",
                                path: "res/docs/subjects/finance/solutions/spezielle_probleme_l.pdf"
                            }
                        ]}/>
                        <br/>
                        <Typography variant="h6" gutterBottom>
                            Band 3
                        </Typography>
                        <DocumentContainer children={[
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_4.pdf"
                            },
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_5.pdf"
                            },
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_9.pdf"
                            },
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_10_1.pdf"
                            },
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_10_2.pdf"
                            },
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_11.pdf"
                            },
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_12_1.pdf"
                            },
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_12_2.pdf"
                            },
                            {
                                name: "Beleg & Kontierung",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_12_3.pdf"
                            }
                        ]}/>
                    </div>
                </Subject>
                <Subject name={"Informatik"} expanded={expanded} handleChange={handleChange}>
                    <div style={{width: '100%'}}>
                        <DocumentContainer children={[
                            {name: "Bildungsplan", path: "res/docs/subjects/engineering/bildungsplan.pdf"},
                            {name: "Lehrplan", path: "res/docs/subjects/engineering/lehrplan.pdf"},
                            {name: "Masterplan", path: "res/docs/subjects/engineering/masterplan.xlsx"},
                            {name: "ProBe", path: "res/docs/subjects/engineering/probe.docx"},
                            {name: "Survival Guide", path: "res/docs/subjects/engineering/survival_guide.pdf"}
                        ]}/>
                    </div>
                </Subject>
                <Subject name={"Mathematik"} expanded={expanded} handleChange={handleChange}>
                    <div style={{width: '100%'}}>
                        <DocumentContainer children={[
                            {
                                name: "Alles Mathematik von Pythagoras zu Big Data",
                                path: "res/docs/subjects/maths/alles_mathematik_von_pythagoras_zu_big_data.pdf"
                            },
                            {
                                name: "Geometrie für Dummies",
                                path: "res/docs/subjects/maths/geometrie_fuer_dummies.epub"
                            },
                            {name: "SMS Mathematik", path: "res/docs/subjects/maths/sms_mathematik.pdf"}
                        ]}/>
                        <br/>
                        <Typography variant="h6" gutterBottom>
                            Quadratische Gleichungen
                        </Typography>
                        <DocumentContainer children={[
                            {name: "Theorie", path: "res/docs/subjects/maths/quadratische_gleichungen_theorie.pdf"}
                        ]}/>
                        <br/>
                        <Typography variant="h6" gutterBottom>
                            Reelle Funktionen
                        </Typography>
                        <DocumentContainer children={[
                            {name: "Theorie", path: "res/docs/subjects/maths/reelle_funktionen_theorie.pdf"},
                            {name: "Test Lösungen", path: "res/docs/subjects/maths/reelle_funktionen_test_l.docx"}
                        ]}/>
                        <br/>
                        <Typography variant="h6" gutterBottom>
                            Lineare Gleichungen
                        </Typography>
                        <DocumentContainer children={[
                            {name: "Theorie", path: "res/docs/subjects/maths/lineare_gleichungen_theorie.pdf"}
                        ]}/>
                    </div>
                </Subject>
                <Subject name={"Wirtschaft und Recht"} expanded={expanded} handleChange={handleChange}>
                    <div style={{width: '100%'}}>
                        <Typography variant="h6" gutterBottom>
                            VWL
                        </Typography>
                        <DocumentContainer children={[
                            {
                                name: "Volkswirtschaftslehre",
                                path: "res/docs/subjects/economics/vwl/volkswirtschaftslehre.pdf"
                            },
                            {
                                name: "Kapitel 6 - Geld und Preisstabilität",
                                path: "res/docs/subjects/economics/vwl/k6_geld_und_preisstabilitaet.pdf"
                            }
                        ]}/>
                    </div>
                </Subject>
            </div>
        );
    }
}