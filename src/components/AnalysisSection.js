import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import initialAggregatedData from "../initial-aggregated-data";


const AnalysisSection = ({data}) => {
    const [ aggregatedData, setAggregatedData ] = useState(initialAggregatedData);


    function collectData(){
        const columnOrder = data["columnOrder"];
        const columns = data["columns"];
        // console.log(columnOrder);
        // console.log(data);
        // console.log(initialAggregatedData[0]);

        // loop through columnOrder. start at 1 because 0 is exercise search list

        console.log('initialagg: ', initialAggregatedData);
        const newAggregatedData = initialAggregatedData;
        console.log('before aggregation: ', newAggregatedData);
        for (let i = 1; i < columnOrder.length; i++){
                // console.log('day ', i, ': ', columnOrder[i]);
                // console.log(columns[columnOrder[i]]["exerciseIds"]);


                const currColumnId = columns[columnOrder[i]];
                const exerciseIds = currColumnId["exerciseIds"];

                for (const exerciseId of exerciseIds){
                    console.log('logging ', exerciseId)
                    const target = data["exercises"][exerciseId]["target"];
                    const newSetsReps = data["exercises"][exerciseId]["setsReps"];
                    const currSetsReps = newAggregatedData[i-1][target];
                    newAggregatedData[i-1][target] = [currSetsReps[0]+newSetsReps[0], currSetsReps[1]+newSetsReps[1]];
                }
        }

        setAggregatedData(newAggregatedData);
        console.log(newAggregatedData);
        // loop through exerciseIds

        // add sets and reps to
    }

    return (
        <div>
            AnalysisSection
            <Button variant="contained" onClick={collectData}>Refresh Analysis</Button>
        </div>
    )
}

export default AnalysisSection;
