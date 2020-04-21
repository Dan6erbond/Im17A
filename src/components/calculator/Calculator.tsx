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
    TableBody,
    Button,
    Badge,
    CardContent,
    Card,
    CardActions,
    Backdrop,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {styles} from "../styles";
import {ReactCookieProps} from "react-cookie";
import {Link} from "react-router-dom";
import SubjectGraph from "./SubjectGraph";

class Subject {
    grades: number[];
    name: string;

    constructor(name: string = "", v?: any) {
        this.name = v && v.name ? v.name : name;
        this.grades = v && v.grades ? v.grades : [0, 0, 0, 0, 0, 0, 0];
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

    isProject(): boolean {
        let cnt = 0;

        for (let i = 0; i < this.grades.length - 1; i++) {
            let g = this.grades[i];
            if (g === 0 || g === -1)
                continue;
            cnt++;
        }

        return cnt > 1;
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

export class Subjects {
    subjects: Subject[];
    average: number = 0;
    minusPoints: number = 0;
    projectMinusPoints: number = 0;

    constructor(subjects: Subject[]) {
        this.subjects = subjects;
    }

    calculate() {
        const subjects = this.subjects;

        let mp = 0;

        let sum = 0;
        let cnt = 0;
        ;

        let pSum = 0;
        let pCnt = 0;

        let fp = 0;

        for (let i = 0; i < subjects.length; i++) {
            let s = subjects[i];
            let avg = s.average();

            if (avg !== 0) {
                if (i < subjects.length - 5) {
                    sum += avg;
                    cnt++;

                    if (avg < 4)
                        mp += 4 - avg;
                } else if (i === subjects.length - 1) {
                    fp = avg;
                } else {
                    pSum += avg;
                    pCnt++;
                }
            }
        }

        let pAvg = 0;
        let pmp = 0;

        if (pCnt !== 0 && fp !== 0) {
            let spAvg = pSum / pCnt;
            pAvg = (spAvg + fp) / 2;
            pAvg = Math.round(pAvg * 2) / 2;

            if (pAvg < 4)
                pmp = 4 - pAvg;
            mp += pmp;
        }

        let avg = 0;

        if (cnt !== 0 && pAvg !== 0) {
            avg = (sum + pAvg) / (cnt + 1);
        }

        this.average = avg;
        this.minusPoints = mp;
        this.projectMinusPoints = pmp;
    }
}

interface CalculatorState {
    subjects?: Subjects;
    backdropOpen?: boolean;
    dialogOpen?: boolean;
}

export class CalculatorSmall extends React.Component<WithStyles<typeof styles> & ReactCookieProps, CalculatorState> {
    constructor(props: WithStyles<typeof styles> & ReactCookieProps) {
        super(props);

        let subjects: Subject[];

        let item = localStorage.getItem("subjects");

        if (item) {
            subjects = JSON.parse(item);
            subjects = subjects.map(s => new Subject("", s));
            this.state = {subjects: new Subjects(subjects)};
        } else {
            this.state = {subjects: undefined}
        }
    }

    componentDidMount() {
        const {subjects} = this.state;
        if (subjects) {
            subjects.calculate();
            this.setState({subjects: subjects});
        }
    }

    render() {
        const {classes} = this.props;
        const {subjects} = this.state;

        return (
            <Card className={classes.cardsRoot}>
                <CardContent>
                    <Typography className={classes.cardsTitle} color="textSecondary" gutterBottom>
                        Notenrechner
                    </Typography>
                    {subjects ? <div>
                        <Typography variant="h5" component="h2">
                            Durchschnitt: {subjects.average.toPrecision(2)}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Minuspunkte: {subjects.minusPoints}
                        </Typography>
                    </div> : <div>
                        <Typography variant="h6" component="h2">
                            Noch keine Noten eingetragen
                        </Typography>
                    </div>}
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} to="/calculator">Zum Notenrechner</Button>
                </CardActions>
            </Card>
        );
    }
}

interface CalculatorProps extends WithStyles<typeof styles> {
    fullscreen: boolean;
}

class Calculator extends React.Component<CalculatorProps, CalculatorState> {
    constructor(props: CalculatorProps) {
        super(props);

        this.setGrade = this.setGrade.bind(this);

        let subjects: Subject[];

        let item = localStorage.getItem("subjects");

        if (item) {
            subjects = JSON.parse(item);
            subjects = subjects.map(s => new Subject("", s));
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

        this.state = {subjects: new Subjects(subjects), backdropOpen: false, dialogOpen: false};
    }

    componentDidMount() {
        const subjects = this.state.subjects!!;
        subjects.calculate();
        this.setState({subjects: subjects});
    }

    private setGrade(grade: string, subjectIndex: number, gradeIndex: number) {
        let g = Number(grade);
        let subjects = this.state.subjects!!;

        subjects.subjects[subjectIndex].grades[gradeIndex] = g;

        subjects.calculate();
        this.setState({subjects: subjects});
    }

    render() {
        const {classes, fullscreen} = this.props;
        const {backdropOpen, dialogOpen} = this.state;
        const subjects = this.state.subjects!!;

        return (
            <React.Fragment>
                <Typography variant="h5">Notenrechner</Typography>

                <br/>

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
                            {subjects.subjects.map((s, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {s.name}
                                    </TableCell>
                                    {Array.from({length: 7}, (v, j) => (
                                        <TableCell align="right" key={j}>
                                            {s.grades[j] !== -1 ?
                                                <TextField size="small" id={`grade-${i}-${j}`} label="Note"
                                                           variant="outlined" value={s.grades[j]}
                                                           inputProps={{min: "1", max: "6", step: "0.5"}}
                                                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                               this.setGrade((event.target as HTMLInputElement).value, i, j)
                                                           }}
                                                           type="number" InputLabelProps={{shrink: true,}}/>
                                                : null}
                                        </TableCell>
                                    ))}
                                    <TableCell align="right" style={{width: '140px'}}>
                                        <Badge color="secondary"
                                               badgeContent={-(i < subjects.subjects.length - 5 && s.average() > 0 ?
                                                   Math.max(4 - s.average(), 0) : subjects.projectMinusPoints)}>
                                            <TextField size="small" id={`grade-${i}-average`} label="Durchschnitt"
                                                       variant="outlined" value={s.average()}
                                                       InputProps={{readOnly: true,}}
                                                       error={(i < subjects.subjects.length - 5 && s.average() < 4 && s.average() > 0) ||
                                                       (i >= subjects.subjects.length - 5 && subjects.projectMinusPoints > 0)}
                                                       type="number" InputLabelProps={{shrink: true,}}/>
                                        </Badge>
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
                                               variant="outlined" value={subjects.average.toPrecision(2)}
                                               InputProps={{readOnly: true,}}
                                               type="number" InputLabelProps={{shrink: true}}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={9}>
                                    <Typography variant="body1"
                                                color={subjects.minusPoints <= 2 ? "textPrimary" : "error"}>Minuspunkte: {subjects.minusPoints}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <br/>

                <div style={{textAlign: 'right', paddingBottom: '50px'}}>
                    <Button variant="contained" color="primary" onClick={() => this.setState({dialogOpen: true})}>
                        Graph anzeigen
                    </Button>
                    <span style={{width: '5px', display: 'inline-block'}}/>
                    <Button variant="contained" color="primary" onClick={() => {
                        this.setState({backdropOpen: true});
                        localStorage.setItem("subjects", JSON.stringify(subjects.subjects));
                        setTimeout(() => {
                            this.setState({backdropOpen: false});
                        }, 500);
                    }}>
                        Speichern
                    </Button>
                </div>

                <Backdrop className={classes.backdrop} open={backdropOpen!!}>
                    <CircularProgress color="inherit"/>
                </Backdrop>

                <Dialog fullScreen={fullscreen}
                        open={dialogOpen!!}
                        onClose={() => this.setState({dialogOpen: false})}
                        aria-labelledby="responsive-dialog-title"
                        maxWidth="lg">
                    <DialogTitle id="responsive-dialog-title">Notengraph</DialogTitle>
                    <DialogContent>
                        <div style={{
                            marginRight: '10px',
                            paddingRight: '25px',
                            paddingBottom: '15px',
                            marginBottom: '5px'
                        }}>
                            <SubjectGraph subjects={subjects}/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => this.setState({dialogOpen: false})} color="primary">
                            Schliessen
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default function CalculatorWrapper(props: WithStyles<typeof styles>) {
    const {classes} = props;
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));

    return <Calculator fullscreen={fullscreen} classes={classes}/>
}