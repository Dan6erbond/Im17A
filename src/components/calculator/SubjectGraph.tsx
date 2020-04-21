import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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

    console.log(data);

    return (
        <LineChart width={600}
                   height={300}
                   data={data}
                   margin={{
                       top: 5, right: 30, left: 20, bottom: 5,
                   }}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis domain={[1, 6]}/>
            <Tooltip/>
            <Legend/>
            {subs.map((s, i) => <Line key={i} type="monotone" dataKey={s} stroke={colors[i + 1]} strokeDasharray="5 5"/>)}
            <Line type="monotone" dataKey="avg" name="Durchschnitt" stroke={colors[0]}/>
        </LineChart>
    );
}