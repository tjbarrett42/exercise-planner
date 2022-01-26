import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';

const WorkoutTitleEntry = (props) => {
    /* States for updating title */
    const [ title, setTitle ] = useState(props.title);

    /* Callback for updating title on input change */
    function onTitleInputChange(e) {
        setTitle(e.target.value);
    }

    /* useEffect to update title to parent during term update*/
    useEffect(() => {
        props.onFormSubmitToWTE(props.columnId, title);
        // console.log('props title: ', props.title);
        // console.log('updating column ', props.columnId, ' name to ', title);
    }, [title]);

    return (
        <TextField
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