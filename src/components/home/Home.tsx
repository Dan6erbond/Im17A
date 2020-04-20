import {Tab, Tabs, useMediaQuery, useTheme, WithStyles} from "@material-ui/core";
import {styles} from "../styles";
import React from "react";
import {CalculatorSmall} from "../calculator/Calculator";
import {ReactCookieProps} from "react-cookie";
import SummariesContainer from "../summaries/Summaries";
import DocumentContainer from "../documents/DocumentContainer";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel"
             hidden={value !== index}
             id={`vertical-tabpanel-${index}`}
             aria-labelledby={`vertical-tab-${index}`}
             style={{padding: '10px'}}
             {...other}>
            {children}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Home(props: WithStyles<typeof styles> & ReactCookieProps) {
    const theme = useTheme();
    const vertical = useMediaQuery(theme.breakpoints.up('md'));
    const {classes, cookies} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const headers = ["Zusammenfassungen", "Dokumente", "Notenrechner"];

    return (
        <div className={vertical ? classes.verticalTabsRoot : classes.horizontalTabsRoot}>
            {vertical ?
                <Tabs
                    orientation={"vertical"}
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.verticalTabs}>
                    {headers.map((t, i) =>
                        <Tab label={t} {...a11yProps({i})} />)}
                </Tabs> :
                <Tabs value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                      indicatorColor="secondary"
                      variant="scrollable"
                      scrollButtons="auto"
                      className={classes.horizontalTabs}>
                    {headers.map((t, i) =>
                        <Tab label={t} {...a11yProps({i})} />)}
                </Tabs>}
            <TabPanel value={value} index={0}>
                <SummariesContainer component="SummariesSmall" classes={classes}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DocumentContainer children={[
                    {name: "Aufgabenliste", path: "res/docs/general/aufgabenliste.pdf"},
                    {name: "Klassenliste", path: "res/docs/general/klassenliste.xlsx"},
                    {name: "Stundenplan", path: "res/docs/general/stundenplan.docx"}
                ]}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CalculatorSmall classes={classes} cookies={cookies}/>
            </TabPanel>
        </div>
    );
}