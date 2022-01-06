import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Input} from "@mui/material";

const ExerciseSetsRepsEntry = (props) => {
    /* States for updating set/reps */
    const [ setsReps, setSetsReps ] = useState([null,null]);

    /* Callback for updating term on input change */
    function onSetsInputChange(e) {
        const newSetsReps = {...setsReps};
        setSetsReps([e.target.value, newSetsReps[1]]);
    }
    function onRepsInputChange(e) {
        const newSetsReps = {...setsReps};
        setSetsReps([newSetsReps[0], e.target.value]);
    }

    /* useEffect to update setsReps to parent during term update*/
    useEffect(() => {
        props.onFormSubmitToSRE(setsReps);
    }, [setsReps]);

    return (
        <div>
            <TextField
                id="filled-number"
                label="Sets"
                type="number" value={setsReps[0]}
                variant="filled"
                placeholder="Sets"
                onChange={onSetsInputChange}
            />
            <TextField
                id="filled-number"
                label="Reps"
                type="number" value={setsReps[1]}
                variant="filled"
                placeholder= "Reps"
                onChange={onRepsInputChange}
            />
        </div>

    )
}

export default ExerciseSetsRepsEntry;