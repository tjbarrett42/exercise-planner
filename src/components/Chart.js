import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = (props) => {
        return (
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="abductors[0]" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2}/>
                    <Line type="monotone" dataKey="abs[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="adductors[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="biceps[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="calves[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="cardiovascularsystem[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="delts[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="forearms[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="glutes[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="hamstrings[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="lats[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="levatorscapulae[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="pectorals[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="quads[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="serratusanterior[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="spine[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="traps[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="triceps[0]" stroke="#82ca9d" strokeWidth={2}/>
                    <Line type="monotone" dataKey="upperback[0]" stroke="#82ca9d" strokeWidth={2}/>

                </LineChart>
            </ResponsiveContainer>
        );
}

export default Chart;
