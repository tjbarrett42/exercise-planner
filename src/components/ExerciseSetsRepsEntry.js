import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Input} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)`
    min-width: 30px;

`

const ExerciseSetsRepsEntry = (props) => {
    /* States for updating set/reps */
    const [ setsReps, setSetsReps ] = useState([0,0]);

    /* Callback for updating term on input change */
    function onSetsInputChange(e) {
        const newSetsReps = {...setsReps};
        setSetsReps([Number(e.target.value), newSetsReps[1]]);
    }
    function onRepsInputChange(e) {
        const newSetsReps = {...setsReps};
        setSetsReps([newSetsReps[0], Number(e.target.value)]);
    }

    /* useEffect to update setsReps to parent during term update*/
    useEffect(() => {
        props.onFormSubmitToSRE(props.exerciseId, setsReps);
    }, [setsReps]);

    return (
        <Grid container>
            <Grid xs={6}>
                <CustomTextField
                    id="filled-number"
                    label="Sets"
                    type="number" value={setsReps[0]}
                    variant="filled"
                    placeholder="Sets"
                    size="small"
                    onChange={onSetsInputChange}
                />
            </Grid>
            <Grid xs={6}>
                <CustomTextField
                    id="filled-number"
                    label="Reps"
                    type="number" value={setsReps[1]}
                    variant="filled"
                    placeholder= "Reps"
                    size="small"
                    onChange={onRepsInputChange}
                    // inputProps={{
                    //     style: {
                    //         padding: 5
                    //     }
                    // }}
                />
            </Grid>
        </Grid>

    )
}

export default ExerciseSetsRepsEntry;