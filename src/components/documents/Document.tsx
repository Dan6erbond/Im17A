import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Grid, Typography} from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    })
);

interface DocumentProps {
    path: string;
    name: string;
}

export default function Document(props: DocumentProps) {
    const classes = useStyles();
    const {path, name} = props;

    const ext = path.split(".").slice(-1)[0];

    let ico = "thumbnail_docx.png";
    if (ext === "pptx" || ext === "ppt") {
        ico = "thumbnail_pptx.png";
    } else if (ext === "xlsx" || ext === "xls") {
        ico = "thumbnail_xlsx.png";
    } else if (ext === "pdf") {
        ico = "thumbnail_pdf.png";
    } else if (ext === "zip") {
        ico = "thumbnail_zip.png";
    }

    return (
        <Card className={classes.root}
              style={{height: '100%', width: '100%', display: "grid", gridTemplateRows: "1fr auto"}}
              variant="outlined">
            <CardContent style={{alignSelf: "stretch", paddingBottom: '8px'}}>
                <Grid container spacing={1} style={{height: '100%'}}>
                    <Grid item xs={12} sm={4}>
                        <div style={{width: '100%', padding: '5px', textAlign: 'center'}}>
                            <img alt="" style={{width: 'auto', maxWidth: '100%', maxHeight: '100px'}}
                                 src={`${process.env.PUBLIC_URL}/res/img/icons/${ico}`}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div style={{
                            width: '100%',
                            padding: '5px',
                            height: '100%',
                            display: "grid",
                            gridTemplateRows: "1fr auto"
                        }}>
                            <div style={{alignSelf: "stretch"}}>
                                <Typography variant="h5" component="h2">
                                    {name}
                                </Typography>
                            </div>
                            <CardActions style={{paddingLeft: 0, paddingBottom: 0}}>
                                <Button href={`${process.env.PUBLIC_URL}/${path}`} download size="small"
                                        startIcon={<GetAppIcon/>}>
                                    Herunterladen
                                </Button>
                            </CardActions>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}