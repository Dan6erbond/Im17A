import {Tab, Tabs, WithStyles} from "@material-ui/core";
import {styles} from "../styles";
import React from "react";
import {CalculatorSmall} from "../calculator/Calculator";
import {ReactCookieProps} from "react-cookie";
import {SummariesSmall} from "../summaries/Summaries";

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
    const {classes, cookies} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.verticalTabsRoot}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Zusammenfassungen" {...a11yProps(0)} />
                <Tab label="Notenrechner" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <SummariesSmall classes={classes}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CalculatorSmall classes={classes} cookies={cookies}/>
            </TabPanel>
        </div>
    );
}