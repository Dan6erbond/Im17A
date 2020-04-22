import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Surface,
    Symbols,
    LegendProps, LegendType,
} from 'recharts';
import {Subjects} from "./Calculator";

interface SubjectGraphProps {
    subjects: Subjects;
}

export default function SubjectGraph(props: SubjectGraphProps) {
    const {subjects} = props;
    const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4",
        "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800",
        "#ff5722", "#ff5722", "#795548", "#9e9e9e", "#607d8b"];

    const [hidden, setHidden] = React.useState<string[]>([]);

    const averageValue = "Durchschnitt";
    const [averageEnabled, setAverageEnabled] = React.useState<boolean>(true);

    let toggleHidden = (dataKey: string) => {
        let h = hidden.map(n => n);
        if (h.indexOf(dataKey) === -1)
            h.push(dataKey);
        else
            h = h.filter(dk => dk !== dataKey);
        setHidden(h);
    };

    let data: any[] = [];
    let subs: string[] = [];

    for (let i = 0; i < 6; i++) {
        let sem: any = {name: `${i + 1}. Semester`};
        let sum = 0;
        let cnt = 0;

        for (let j = 0; j < subjects.subjects.length; j++) {
            let s = subjects.subjects[j];
            let g = s.grades[i];

            if (g === 0 || g === -1)
                continue;

            if (subs.indexOf(s.name) === -1)
                subs.push(s.name);

            sum += g;
            cnt++;

            sem[s.name] = s.grades[i];
        }

        if (cnt === 0)
            continue;

        sem["avg"] = (sum / cnt).toPrecision(2);
        data.push(sem);
    }

    let renderCustomizedLegend = (props: LegendProps) => {
        return (
            <div className="customized-legend">
                {props.payload!!.map((entry, index) => {
                    const {value, color} = entry;

                    let disabled;
                    if (value === averageValue)
                        disabled = !averageEnabled;
                    else
                        disabled = hidden.indexOf(value) !== -1;

                    const style = {
                        marginRight: 10,
                        color: disabled ? "#AAA" : "#000"
                    };

                    return (
                        <span className="legend-item"
                              onClick={() => value === averageValue ? setAverageEnabled(!averageEnabled) : toggleHidden(value)}
                              style={style} key={index}>
                              <Surface width={10} height={10} viewBox={{x: 0, y: 0, width: 10, height: 10}}>
                                    <Symbols cx={5} cy={5} type="circle" size={50} fill={color}/>
                                  {disabled && <Symbols
                                      cx={5}
                                      cy={5}
                                      type="circle"
                                      size={25}
                                      fill={"#FFF"}
                                  />}
                                  </Surface>
                              <span>{value}</span>
                        </span>
                    );
                })}
            </div>
        );
    };

    let legendType: LegendType = 'none';

    return (
        <div style={{width: '90%', display: 'inline-block'}}>
            <ResponsiveContainer aspect={16 / 9} minHeight={550}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis domain={[1, 6]}/>
                    <Tooltip/>

                    {subs.filter(s => hidden.indexOf(s) === -1).map((s, i) => <Line key={i} type="monotone" dataKey={s}
                                                                                    stroke={colors[i + 1]}
                                                                                    strokeDasharray="5 5"/>)}
                    {averageEnabled ?
                        <Line type="monotone" dataKey="avg" name="Durchschnitt" stroke={colors[0]}/> : null}

                    <Legend
                        payload={subs.map((s, i) => ({value: s, type: legendType, color: colors[i + 1], id: ''})).concat([{
                            value: averageValue,
                            type: 'none',
                            color: colors[0],
                            id: ''
                        }])}
                        content={renderCustomizedLegend}
                        onClick={args => args["dataKey"] === averageValue ? setAverageEnabled(!averageEnabled) : toggleHidden(args["dataKey"])}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}