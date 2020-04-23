import * as React from "react";
import {Typography} from "@material-ui/core";
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
                <Subject name={"Englisch"} expanded={expanded} handleChange={handleChange}>
                    <div style={{width: '100%'}}>
                        <DocumentContainer children={[
                            {name: "Unit 1", path: "res/docs/subjects/english/unit_1.pdf"}
                        ]}/>
                    </div>
                </Subject>
            </div>
        );
    }
}