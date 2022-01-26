import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import './SetsRepsLineChart.css';
import Typography from "@mui/material/Typography";

const SetsRepsLineChart = (props) => {
    const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
        const isVert = axisType === 'yAxis';
        const cx = isVert ? x : x + (width / 2);
        const cy = isVert ? (height / 2) + y : y + height + 10;
        const rot = isVert ? `270 ${cx} ${cy}` : 0;
        return (
            <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
                {children}
            </text>
        );
    };


        return (
            <Card >
                <CardContent className="chart">
                    <Typography align="center">
                        Sets Per Muscle By Day
                    </Typography>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
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
                            <XAxis dataKey="day" />
                            <YAxis label={<AxisLabel axisType="yAxis" x={40} y={200} width={0} height={0}>Sets / Day</AxisLabel>} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="abductors[0]" stroke="#F3676A" activeDot={{ r: 8 }} strokeWidth={2}/>
                            <Line type="monotone" dataKey="abs[0]" stroke="#7E7A8A" strokeWidth={2}/>
                            <Line type="monotone" dataKey="adductors[0]" stroke="#FBAE68" strokeWidth={2}/>
                            <Line type="monotone" dataKey="biceps[0]" stroke="#0CB0A9" strokeWidth={2}/>
                            <Line type="monotone" dataKey="calves[0]" stroke="#0C637F" strokeWidth={2}/>
                            <Line type="monotone" dataKey="cardiovascularsystem[0]" stroke="#82ca9d" strokeWidth={2}/>
                            <Line type="monotone" dataKey="delts[0]" stroke="#83D483" strokeWidth={2}/>
                            <Line type="monotone" dataKey="forearms[0]" stroke="#98968A" strokeWidth={2}/>
                            <Line type="monotone" dataKey="glutes[0]" stroke="#82ca9d" strokeWidth={2}/>
                            <Line type="monotone" dataKey="hamstrings[0]" stroke="#B7D9AD" strokeWidth={2}/>
                            <Line type="monotone" dataKey="lats[0]" stroke="#118AB2" strokeWidth={2}/>
                            <Line type="monotone" dataKey="levatorscapulae[0]" stroke="#FFD166" strokeWidth={2}/>
                            <Line type="monotone" dataKey="pectorals[0]" stroke="#EF436B" strokeWidth={2}/>
                            <Line type="monotone" dataKey="quads[0]" stroke="#073B4C" strokeWidth={2}/>
                            <Line type="monotone" dataKey="serratusanterior[0]" stroke="#F5D79F" strokeWidth={2}/>
                            <Line type="monotone" dataKey="spine[0]" stroke="#795366" strokeWidth={2}/>
                            <Line type="monotone" dataKey="traps[0]" stroke="#BC9266" strokeWidth={2}/>
                            <Line type="monotone" dataKey="triceps[0]" stroke="#F78A69" strokeWidth={2}/>
                            <Line type="monotone" dataKey="upperback[0]" stroke="#06D6A0" strokeWidth={2}/>

                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>

            </Card>



        );
}

export default SetsRepsLineChart;
