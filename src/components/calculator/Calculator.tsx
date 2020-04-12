import * as React from "react";
import {
    Paper,
    TextField,
    WithStyles,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, Button
} from "@material-ui/core";
import {styles} from "../styles";
import {ReactCookieProps} from "react-cookie";

class Subject {
    grades = [0, 0, 0, 0, 0, 0, 0];
    name: string;

    constructor(name: string = "") {
        this.name = name;
    }

    copyInto(v: any) {
        this.grades = v.grades;
        this.name = v.name;
        return this;
    }

    average(): number {
        let sum = 0;
        let cnt = 0;

        for (let i = 0; i < this.grades.length - 1; i++) {
            let g = this.grades[i];
            if (g === 0 || g === -1)
                continue;
            sum += g;
            cnt++;
        }

        let last = this.grades[this.grades.length - 1];

        let avg = 0;

        if (cnt === 0 && last !== 0 && last !== -1)
            avg = last;
        else if (last !== 0 && last !== -1)
            avg = (sum / cnt + last) / 2;
        else
            avg = sum / cnt;

        avg = Math.round(avg * 2) / 2;

        return !isNaN(avg) ? avg : 0;
    }

}

class History extends Subject {
    grades = [0, 0, 0, 0, -1, -1, -1];

    constructor() {
        super("Geschichte und Politik");
    }

}

class Sciences extends Subject {
    grades = [0, 0, -1, -1, -1, -1, -1];

    constructor() {
        super("Technik und Umwelt");
    }

}

class Project extends Subject {
    grades = [-1, -1, -1, -1, -1, -1, -1];

    constructor(name: string, index: number) {
        super(name);
        this.grades[index] = 0;
    }

}

interface CalculatorState {
    subjects: Subject[];
    average: number;
    minusPoints: number;
}

export default class Calculator extends React.Component<WithStyles<typeof styles> & ReactCookieProps, CalculatorState> {
    constructor(props: WithStyles<typeof styles> & ReactCookieProps) {
        super(props);

        this.setGrade = this.setGrade.bind(this);
        this.calculate = this.calculate.bind(this);

        let subjects: Subject[];

        const {cookies} = this.props;

        if (cookies) {
            subjects = cookies.get("subjects");
            for (let i = 0; i < subjects.length; i++) {
                let s = new Subject();
                subjects[i] = s.copyInto(subjects[i]);
            }
        } else {
            subjects = [
                new Subject("Deutsch"),
                new Subject("Französisch"),
                new Subject("Englisch"),
                new Subject("Mathematik"),
                new Subject("Finanz- und Rechnungswesen"),
                new Subject("Wirtschaft und Recht"),
                new History(),
                new Sciences(),
                new Project("IDAF FRW", 2),
                new Project("IDAF Informatik", 2),
                new Project("IDAF Deutsch", 4),
                new Project("IDAF Wirtschaft", 4),
                new Project("IDPA", 6)
            ];
        }

        this.state = {subjects: subjects, average: 0, minusPoints: 0};
    }

    componentDidMount() {
        this.calculate();
    }

    private setGrade(grade: string, subjectIndex: number, gradeIndex: number) {
        let g = Number(grade);
        let {subjects} = this.state;
        subjects[subjectIndex].grades[gradeIndex] = g;
        this.setState({subjects: subjects}, this.calculate);
    }

    private calculate() {
        let mp = 0;

        let sum = 0;
        let cnt = 0;

        let {subjects} = this.state;

        let pSum = 0;
        let pCnt = 0;

        let fp = 0;

        for (let i = 0; i < subjects.length; i++) {
            let s = subjects[i];
            let avg = s.average();

            if (avg !== 0) {
                if (i < subjects.length - 5) {
                    console.log(`Subject: ${avg}`);
                    sum += avg;
                    cnt++;

                    if (avg < 4)
                        mp += 4 - avg;
                } else if (i === subjects.length - 1) {
                    console.log(`Final project: ${avg}`);
                    fp = avg;
                } else {
                    console.log(`Project: ${avg}`);
                    pSum += avg;
                    pCnt++;
                }
            }
        }

        let pAvg = 0;

        if (pCnt !== 0 && fp !== 0){
            let spAvg = pSum / pCnt;
            pAvg = (spAvg + fp) / 2;
            pAvg = Math.round(pAvg * 2) / 2;

            if (pAvg < 4)
                mp += 4 - pAvg;
        }

        let avg = 0;

        if (cnt !== 0 && pAvg !== 0) {
            avg = (sum + pAvg) / (cnt + 1);
            console.log(`Average: ${avg}`);
        }

        this.setState({average: avg, minusPoints: mp});
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Typography variant="h5">Notenrechner</Typography>

                <br/>

                <form noValidate autoComplete="off">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fach</TableCell>
                                    <TableCell align="right">1. Semester</TableCell>
                                    <TableCell align="right">2. Semester</TableCell>
                                    <TableCell align="right">3. Semester</TableCell>
                                    <TableCell align="right">4. Semester</TableCell>
                                    <TableCell align="right">5. Semester</TableCell>
                                    <TableCell align="right">6. Semester</TableCell>
                                    <TableCell align="right">Schlussprüfung</TableCell>
                                    <TableCell align="right">Durchschnitt</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.subjects.map((s, i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {s.name}
                                        </TableCell>
                                        {Array.from({length: 7}, (v, j) => (
                                            <TableCell align="right" key={j}>
                                                {s.grades[j] !== -1 ?
                                                    <TextField size="small" id={`grade-${i}-${j}`} label="Note"
                                                               variant="outlined"
                                                               inputProps={{min: "1", max: "6", step: "0.5"}}
                                                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setGrade((event.target as HTMLInputElement).value, i, j)}
                                                               value={s.grades[j]}
                                                               type="number" InputLabelProps={{shrink: true,}}/>
                                                    : null}
                                            </TableCell>
                                        ))}
                                        <TableCell align="right">
                                            <TextField size="small" id={`grade-${i}-average`} label="Durchschnitt"
                                                       variant="outlined" value={s.average()}
                                                       InputProps={{readOnly: true,}} error={s.average() < 4}
                                                       type="number" InputLabelProps={{shrink: true}}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell component="th" scope="row">Gesamtschnitt</TableCell>
                                    {Array.from({length: 7}, (v, j) => (
                                        <TableCell align="right" key={j}/>
                                    ))}
                                    <TableCell align="right">
                                        <TextField size="small" id={`average`} label="Durchschnitt"
                                                   variant="outlined" value={this.state.average}
                                                   InputProps={{readOnly: true,}}
                                                   type="number" InputLabelProps={{shrink: true}}/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </form>

                <br/>

                <p>Minuspunkte: {this.state.minusPoints}</p>

                <br/>

                <div style={{textAlign: 'right', paddingBottom: '50px'}}>
                    <Button variant="contained" color="primary" onClick={() => {
                        const {cookies} = this.props;
                        if (cookies) {
                            cookies.set("subjects", JSON.stringify(this.state.subjects), {path: "/calculator"});
                        }
                    }}>
                        Save
                    </Button>
                </div>
            </React.Fragment>
        );
    }
}