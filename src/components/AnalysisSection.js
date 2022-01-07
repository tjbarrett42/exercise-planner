import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import initialAggregatedData from "../initial-aggregated-data";
import cloneDeep from 'lodash/cloneDeep';
import Chart from './Chart.js';
import Container from "@mui/material/Container";
import './AnalysisSection.css';


const AnalysisSection = ({data}) => {
    const [ aggregatedData, setAggregatedData ] = useState(initialAggregatedData);

    console.log('on load initialagg: ', initialAggregatedData);

    function collectData(){

        // console.log(columnOrder);
        // console.log(data);
        // console.log(initialAggregatedData[0]);

        // loop through columnOrder. start at 1 because 0 is exercise search list

        // console.log('initialagg: ', initialAggregatedData);
        const newAggregatedData = cloneDeep(initialAggregatedData);
        // console.log('before aggregation: ', newAggregatedData);

        const columnOrder = data["columnOrder"];
        const columns = data["columns"];
        for (let i = 1; i < columnOrder.length; i++){
                // console.log('day ', i, ': ', columnOrder[i]);
                // console.log(columns[columnOrder[i]]["exerciseIds"]);


                const currColumnId = columns[columnOrder[i]];
                const exerciseIds = currColumnId["exerciseIds"];

                for (const exerciseId of exerciseIds){
                    console.log('logging ', exerciseId)
                    console.log(data["exercises"][exerciseId]);
                    const target = data["exercises"][exerciseId]["target"].replace(/\s/g, '');
                    console.log('target: ', target);
                    const newSetsReps = data["exercises"][exerciseId]["setsReps"];
                    const currSetsReps = newAggregatedData[i-1][target];
                    newAggregatedData[i-1][target] = [currSetsReps[0] + newSetsReps[0], currSetsReps[1]+newSetsReps[1]];
                }
        }

        setAggregatedData(newAggregatedData);
        console.log(newAggregatedData);
        // loop through exerciseIds

        // add sets and reps to
    }

    useEffect(() => {
        console.log('aggregatedData: ', aggregatedData);
    },[aggregatedData])

    return (
        <div>
            AnalysisSection
            <Button variant="contained" onClick={collectData}>Refresh Analysis</Button>
            <Container className="analysis-section-chart-container">
                <Chart data={aggregatedData}></Chart>
            </Container>
        </div>
    )
}

export default AnalysisSection;
