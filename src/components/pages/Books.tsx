import * as React from "react";
import {Divider, Typography} from "@material-ui/core";
import Subject from "../subject/Subject";
import DocumentContainer from "../documents/DocumentContainer";
import {RouteComponentProps} from "react-router";

interface BooksState {
    subject?: string;
    expanded: string | false;
}

interface BooksParams {
    subject?: string;
}

export default class Books extends React.Component<RouteComponentProps<BooksParams>, BooksState> {
    constructor(props: RouteComponentProps<BooksParams>) {
        super(props);

        const {subject} = props.match.params;
        this.state = {subject: subject, expanded: subject ? subject : false};

        this.setExpanded = this.setExpanded.bind(this);
    }

    static getDerivedStateFromProps(nextProps: RouteComponentProps<BooksParams>, prevState: BooksState) {
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
                    Bücher
                </Typography>
                <br/>
                <Subject name={"Französisch"} expanded={expanded} handleChange={handleChange} disabled>
                    <div style={{width: '100%'}}>
                    </div>
                </Subject>
                <Subject name={"Deutsch"} expanded={expanded} handleChange={handleChange} disabled>
                    <div style={{width: '100%'}}>
                    </div>
                </Subject>
                <Subject name={"Englisch"} expanded={expanded} handleChange={handleChange}>
                    <div style={{width: '100%'}}>
                        <DocumentContainer children={[
                            {name: "Unit 1", path: "res/docs/subjects/english/unit_1.pdf"}
                        ]}/>
                    </div>
                </Subject>
                <Subject name={"Finanz- und Rechnungswesen"} expanded={expanded} handleChange={handleChange}>
                    <div style={{width: '100%'}}>
                        <DocumentContainer children={[
                            {name: "Abacus Kapitel 6", path: "res/docs/subjects/finance/abacus/abacus_2019_kap_6.pdf"}
                        ]}/>
                        <br/>
                        <Typography variant="h6" gutterBottom>
                            Band 3
                        </Typography>
                        <DocumentContainer children={[
                            {
                                name: "Kapitel 4",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_4.pdf"
                            },
                            {
                                name: "Kapitel 5",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_5.pdf"
                            },
                            {
                                name: "Kapitel 9",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_9.pdf"
                            },
                            {
                                name: "Kapitel 10 (1)",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_10_1.pdf"
                            },
                            {
                                name: "Kapitel 10 (2)",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_10_2.pdf"
                            },
                            {
                                name: "Kapitel 11",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_11.pdf"
                            },
                            {
                                name: "Kapitel 12 (1)",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_12_1.pdf"
                            },
                            {
                                name: "Kapitel 12 (2)",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_12_2.pdf"
                            },
                            {
                                name: "Kapitel 12 (3)",
                                path: "res/docs/subjects/finance/book/band 3/frw_band_3_kapitel_12_3.pdf"
                            }
                        ]}/>
                    </div>
                </Subject>
                <Subject name={"Informatik"} expanded={expanded} handleChange={handleChange} disabled>
                    <div style={{width: '100%'}}>
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
                    </div>
                </Subject>
                <Subject name={"Wirtschaft und Recht"} expanded={expanded} handleChange={handleChange}>
                    <div style={{width: '100%'}}>
                        <Typography variant="h5" gutterBottom>
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
                        <br/>
                        <Typography variant="h6" gutterBottom>
                            Kapitel 9 - Internationale Arbeitsteilung
                        </Typography>
                        <DocumentContainer children={[
                            {
                                name: "Aufgaben (1)",
                                path: "res/docs/subjects/economics/vwl/internationale_arbeitsteilung_aufgaben_1.pdf"
                            },
                            {
                                name: "Aufgaben (2)",
                                path: "res/docs/subjects/economics/vwl/internationale_arbeitsteilung_aufgaben_2.pdf"
                            },
                            {
                                name: "Aufgaben (3)",
                                path: "res/docs/subjects/economics/vwl/internationale_arbeitsteilung_aufgaben_3.pdf"
                            },
                            {
                                name: "Aufgaben (4)",
                                path: "res/docs/subjects/economics/vwl/internationale_arbeitsteilung_aufgaben_4.pdf"
                            }
                        ]}/>
                        <br/>
                        <Divider/>
                    </div>
                </Subject>
            </div>
        );
    }
}