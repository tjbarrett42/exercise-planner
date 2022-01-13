import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Input} from "@mui/material";
import Grid from "@mui/material/Grid";

const WorkoutTitleEntry = (props) => {
    /* States for updating title */
    const [ title, setTitle ] = useState('');

    /* Callback for updating title on input change */
    function onTitleInputChange(e) {
        setTitle(e.target.value);
    }

    /* useEffect to update title to parent during term update*/
    useEffect(() => {
        props.onFormSubmitToWTE(props.columnId, title);
    }, [title]);

    return (
        <TextField
            id="textfield"
            type="text" value={title}
            variant="standard"
            placeholder="Title"
            size="small"
            hiddenLabel
            fullWidth
            onChange={onTitleInputChange}
        />
    )
}

export default WorkoutTitleEntry;