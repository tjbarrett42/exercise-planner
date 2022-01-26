import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)`
    min-width: 30px;

`

const ExerciseSetsRepsEntry = (props) => {
    /* States for updating set/reps */
    const [ setsReps, setSetsReps ] = useState([props.setsReps[0], props.setsReps[1]]);

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
            <Grid item xs={6}>
                <CustomTextField
                    id="filled-number"
                    type="number" value={setsReps[0]}
                    variant="standard"
                    placeholder="Sets"
                    size="small"
                    onChange={onSetsInputChange}
                    hiddenLabel

                />
            </Grid>
            <Grid item xs={6}>
                <CustomTextField
                    id="filled-number"
                    type="number" value={setsReps[1]}
                    variant="standard"
                    placeholder= "Reps"
                    size="small"
                    onChange={onRepsInputChange}
                    hiddenLabel
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