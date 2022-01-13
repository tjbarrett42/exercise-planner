import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import initialAggregatedData from "../initial-aggregated-data";
import cloneDeep from 'lodash/cloneDeep';
import SetsRepsLineChart from './SetsRepsLineChart.js';
import Container from "@mui/material/Container";
import './AnalysisSection.css';
import initialWeeklyTotalData from "../initial-weekly-total-data";
import SetsRepsBarChart from "./SetsRepsBarChart";


const AnalysisSection = ({data}) => {
    const [ aggregatedData, setAggregatedData ] = useState(initialAggregatedData);
    const [ weeklyTotalData, setWeeklyTotalData ] = useState(initialWeeklyTotalData);
    const targets = [ 'abductors',
        'abs',
        'adductors',
        'biceps',
        'calves',
        'cardiovascularsystem',
        'delts',
        'forearms',
        'glutes',
        'hamstrings',
        'lats',
        'levatorscapulae',
        'pectorals',
        'quads',
        'serratusanterior',
        'spine',
        'traps',
        'triceps',
        'upperback'];

    //console.log('on load initialagg: ', initialAggregatedData);

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
                    //console.log('logging ', exerciseId)
                    //console.log(data["exercises"][exerciseId]);
                    const target = data["exercises"][exerciseId]["target"].replace(/\s/g, '');
                    //console.log('target: ', target);
                    const newSetsReps = data["exercises"][exerciseId]["setsReps"];
                    const currSetsReps = newAggregatedData[i-1][target];
                    newAggregatedData[i-1][target] = [currSetsReps[0] + newSetsReps[0], currSetsReps[1]+newSetsReps[1]];
                }
        }

        setAggregatedData(newAggregatedData);
        //console.log(newAggregatedData);
        //console.log(data);
        // loop through exerciseIds

        // add sets and reps to
    }

    function buildWeeklyData(){
        let newWeeklyTotalData = cloneDeep(initialWeeklyTotalData);
        // iterate through aggregatedData
        for (let dayIndex in aggregatedData ){
            // in each day, iterate through target muscles and add sets/reps
            for (let targetIndex in targets){
                // add sets and reps
                //console.log('[0]: ',newWeeklyTotalData[0].setsReps[0]);
                newWeeklyTotalData[targetIndex].setsReps[0] += aggregatedData[dayIndex][targets[targetIndex]][0];
                newWeeklyTotalData[targetIndex].setsReps[1] += aggregatedData[dayIndex][targets[targetIndex]][1];
                //newWeeklyTotalData[targets[targetIndex]][0] += aggregatedData[dayIndex][targets[targetIndex]][0];
                //newWeeklyTotalData[targets[targetIndex]][1] += aggregatedData[dayIndex][targets[targetIndex]][1];
            }
        }
        setWeeklyTotalData(newWeeklyTotalData);
    }

    useEffect(() => {
        //console.log('aggregatedData: ', aggregatedData);
        //console.log('aggregated data loaded, building weekly data');
        buildWeeklyData();

    },[aggregatedData]);

    useEffect(()=> {
        console.log(weeklyTotalData);
    },[weeklyTotalData]);

    return (
        <div>
            AnalysisSection
            <Button variant="contained" onClick={collectData}>Refresh Analysis</Button>
            <Container className="analysis-section-chart-container">
                <SetsRepsBarChart data={weeklyTotalData}></SetsRepsBarChart>
                <SetsRepsLineChart data={aggregatedData}></SetsRepsLineChart>
            </Container>
        </div>
    )
}

export default AnalysisSection;
