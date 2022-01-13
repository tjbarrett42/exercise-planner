import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Line,
    LineChart
} from 'recharts';


const SetsRepsBarChart = (props) => {
        console.log()
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="abductors[0]" fill="#F3676A"/>
                    <Bar dataKey="abs[0]" fill="#7E7A8A"/>
                    <Bar dataKey="adductors[0]" fill="#FBAE68"/>
                    <Bar dataKey="biceps[0]" fill="#0CB0A9"/>
                    <Bar dataKey="calves[0]" fill="#0C637F"/>
                    <Bar dataKey="cardiovascularsystem[0]" fill="#82ca9d"/>
                    <Bar dataKey="delts[0]" fill="#83D483"/>
                    <Bar dataKey="forearms[0]" fill="#98968A"/>
                    <Bar dataKey="glutes[0]" fill="#82ca9d"/>
                    <Bar dataKey="hamstrings[0]" fill="#B7D9AD"/>
                    <Bar dataKey="lats[0]" fill="#118AB2"/>
                    <Bar dataKey="levatorscapulae[0]" fill="#FFD166"/>
                    <Bar dataKey="pectorals[0]" fill="#EF436B"/>
                    <Bar dataKey="quads[0]" fill="#073B4C"/>
                    <Bar dataKey="serratusanterior[0]" fill="#F5D79F"/>
                    <Bar dataKey="spine[0]" fill="#795366"/>
                    <Bar dataKey="traps[0]" fill="#BC9266"/>
                    <Bar dataKey="triceps[0]" fill="#F78A69"/>
                    <Bar dataKey="upperback[0]" fill="#06D6A0"/>
                </BarChart>
            </ResponsiveContainer>
        );
}

export default SetsRepsBarChart;
