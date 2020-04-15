import * as React from "react";
import {
    Button, Card, CardActions, CardContent, Checkbox, createStyles, Grid, GridList,
    IconButton, lighten,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow, TableSortLabel, Theme, Toolbar, Tooltip, Typography,
    WithStyles
} from "@material-ui/core";
import {styles} from "../styles";
import GetAppIcon from '@material-ui/icons/GetApp';
import JSZip from "jszip";
import {saveAs} from 'file-saver';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import moment from 'moment';
import {Link} from "react-router-dom";

interface SummarySpecs {
    subject: string;
    topic: string;
    date: string;
    author: string;
}

class Summary implements SummarySpecs {
    author: string;
    date: string;
    parsedDate: number;
    subject: string;
    topic: string;
    filename: string;
    filepath: string;

    constructor(v: SummarySpecs) {
        this.author = v.author;

        this.date = v.date;
        this.parsedDate = moment(v.date, "DD.MM.YYYY").valueOf();

        this.subject = v.subject;
        this.topic = v.topic;

        let file = this.author === "RaviAnand Mohabir" ? `${v.subject} - ${v.topic}.pdf` : `${v.subject} - ${v.topic} - ${v.author}.pdf`;

        this.filename = file;
        this.filepath = `${process.env.PUBLIC_URL}/res/docs/summaries/${file}`;
    }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof SummarySpecs;
    label: string;
    orderBy?: keyof Summary;
}

const headCells: HeadCell[] = [
    {id: 'date', orderBy: 'parsedDate', disablePadding: true, label: 'Datum'},
    {id: 'subject', disablePadding: false, label: 'Fach'},
    {id: 'topic', disablePadding: false, label: 'Thema'},
    {id: 'author', disablePadding: false, label: 'Autor'},
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Summary) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps & WithStyles<typeof styles>) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property: keyof Summary) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'select all desserts'}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.orderBy ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id || orderBy === headCell.orderBy ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id || orderBy === headCell.orderBy}
                            direction={(orderBy === headCell.id || orderBy === headCell.orderBy) ? order : 'asc'}
                            onClick={createSortHandler(headCell.orderBy ? headCell.orderBy : headCell.id)}
                        >
                            {headCell.label}
                            {(orderBy === headCell.id || orderBy === headCell.orderBy) ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="default"> </TableCell>
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface EnhancedTableToolbarProps {
    numSelected: number;

    downloadSelected(): void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const {numSelected, downloadSelected} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Zusammenfassungen
                </Typography>
            )}
            {numSelected > 0 ? <Tooltip title="Download">
                <IconButton aria-label="download" onClick={downloadSelected}>
                    <GetAppIcon/>
                </IconButton>
            </Tooltip> : null}
        </Toolbar>
    );
};

interface SummariesSmallState {
    summaries: Summary[];
}

export class SummariesSmall extends React.Component<WithStyles<typeof styles>, SummariesSmallState> {
    constructor(props: WithStyles<typeof styles>) {
        super(props);

        this.state = {summaries: []};

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    private fetchData() {
        fetch(`${process.env.PUBLIC_URL}/res/docs/summaries/summaries.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<SummarySpecs[]>;
            })
            .then(data => {
                let summaries = data.map(s => new Summary(s));
                this.setState({summaries: summaries});
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const {classes} = this.props;
        const {summaries} = this.state;

        return (
            <div className={classes.gridListRoot}>
                {summaries.length > 0 ?
                    <Grid container spacing={1}>
                        {stableSort(summaries, getComparator('desc', 'parsedDate'))
                            .slice(0, 5)
                            .map((summary, index) =>
                                <Grid item xs={12} sm={6} key={index}>
                                    <Card className={classes.cardsRoot} variant="outlined">
                                        <CardContent>
                                            <Typography className={classes.cardsTitle} color="textSecondary"
                                                        gutterBottom>
                                                {summary.date}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {summary.topic}
                                            </Typography>
                                            <Typography variant="body2" component="p" gutterBottom>
                                                {summary.subject}
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                                {summary.author}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" href={summary.filepath} download startIcon={<GetAppIcon/>}>
                                                Herunterladen
                                            </Button>
                                            <Button size="small" component={Link} to="/summaries">
                                                Zusammenfassungen
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>)}
                    </Grid> : null}
            </div>
        );
    }
}

interface SummariesState {
    summaries: Summary[];
    order: Order;
    orderBy: keyof Summary;
    selected: string[];
    page: number;
    rowsPerPage: number;
}

export default class Summaries extends React.Component<WithStyles<typeof styles>, SummariesState> {
    constructor(props: WithStyles<typeof styles>) {
        super(props);

        this.state = {
            summaries: [],
            order: 'desc',
            orderBy: "parsedDate",
            selected: [],
            page: 0,
            rowsPerPage: 5
        };

        this.fetchData = this.fetchData.bind(this);
        this.setOrder = this.setOrder.bind(this);
        this.setOrderBy = this.setOrderBy.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setRowsPerPage = this.setRowsPerPage.bind(this);

        this.downloadSelected = this.downloadSelected.bind(this);
        this.getSummaryBlobs = this.getSummaryBlobs.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    private setOrder(order: Order) {
        this.setState({order: order});
    }

    private setOrderBy(orderBy: keyof Summary) {
        this.setState({orderBy: orderBy});
    }

    private setSelected(selected: string[]) {
        this.setState({selected: selected});
    }

    private setPage(page: number) {
        this.setState({page: page});
    }

    private setRowsPerPage(rowsPerPage: number) {
        this.setState({rowsPerPage: rowsPerPage});
    }

    private fetchData() {
        fetch(`${process.env.PUBLIC_URL}/res/docs/summaries/summaries.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<SummarySpecs[]>;
            })
            .then(data => {
                let summaries = data.map(s => new Summary(s));
                this.setState({summaries: summaries});
            })
            .catch(error => {
                console.error(error);
            });
    }

    private getSummaryBlobs(summaries: Summary[], summaryCallback: (summary: Summary, blob: Blob) => void, callback: () => void) {
        if (summaries.length > 0) {
            const summary = summaries[0];
            summaries.shift();

            fetch(summary.filepath)
                .then(response => response.blob())
                .then(blob => {
                    summaryCallback(summary, blob);
                    this.getSummaryBlobs(summaries, summaryCallback, callback);
                });
        } else {
            callback();
        }
    }

    private downloadSelected() {
        const {summaries, selected} = this.state;
        const selectedSummaries = selected.map(s => summaries.filter(summary => summary.filename === s)[0]);

        let zip = new JSZip();
        this.getSummaryBlobs(selectedSummaries, (summary, blob) => {
            zip.file(summary.filename, blob, {base64: true});
        }, () => {
            zip.generateAsync({type: "blob"})
                .then(function (content) {
                    saveAs(content, "summaries.zip");
                });
        });
    }

    render() {
        const {classes} = this.props;
        const {summaries, order, orderBy, selected, page, rowsPerPage} = this.state;

        const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Summary) => {
            const isAsc = orderBy === property && order === 'asc';
            this.setOrder(isAsc ? 'desc' : 'asc');
            this.setOrderBy(property);
        };

        const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const newSelecteds = summaries.map(s => s.filename);
                this.setSelected(newSelecteds);
                return;
            }
            this.setSelected([]);
        };

        const handleClick = (event: React.MouseEvent<unknown>, filename: string) => {
            let newSelected: string[] = [];
            let selectedIndex = selected.indexOf(filename);

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, filename);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }

            this.setSelected(newSelected);
        };

        const handleChangePage = (event: unknown, newPage: number) => {
            this.setPage(newPage);
        };

        const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setRowsPerPage(parseInt(event.target.value, 10));
            this.setPage(0);
        };

        const isSelected = (filename: string) => selected.indexOf(filename) !== -1;

        return (
            <React.Fragment>
                {summaries.length > 0 ? <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} downloadSelected={this.downloadSelected}/>
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={summaries.length}
                            />
                            <TableBody>
                                {stableSort(summaries, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((summary, index) => {
                                        const isItemSelected = isSelected(summary.filename);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow hover
                                                      onClick={(event) => handleClick(event, summary.filename)}
                                                      role="checkbox"
                                                      aria-checked={isItemSelected}
                                                      tabIndex={-1}
                                                      key={index}
                                                      selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox" component="th" scope="row">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    {summary.date}
                                                </TableCell>
                                                <TableCell>{summary.subject}</TableCell>
                                                <TableCell>{summary.topic}</TableCell>
                                                <TableCell>{summary.author}</TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        href={summary.filepath}
                                                        download
                                                        variant="contained"
                                                        className={classes.button}
                                                        startIcon={<GetAppIcon/>}>
                                                        Herunterladen
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={summaries.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper> : null}
            </React.Fragment>
        );
    }
}