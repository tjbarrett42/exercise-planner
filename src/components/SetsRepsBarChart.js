import React, { PureComponent } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
} from 'recharts';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import './SetsRepsBarChart.css';


const SetsRepsBarChart = (props) => {

        return (
            <Card>
                <CardContent className="chart">
                    <Typography align="center">
                        Weekly Set Volume By Target Muscle
                    </Typography>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
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
                            <YAxis type="number" domain={[0,"dataMax"]}/>
                            <Tooltip />
                            <Legend />
                            <Area type="step" dataKey="setRange" fill="grey" strokeWidth={0} shape="square"/>
                            <Scatter dataKey="sets" fill="#3076D2" shape="square"/>
                        </ComposedChart>
                    </ResponsiveContainer>
                </CardContent>

            </Card>



        );
}

export default SetsRepsBarChart;
