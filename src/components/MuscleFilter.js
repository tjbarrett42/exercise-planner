import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import './MuscleFilter.css';

const ITEM_HEIGHT = 94;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 280,
        },
    },
};

const targets = [
    "abductors",
    "abs",
    "adductors",
    "biceps",
    "calves",
    "cardiovascular system",
    "delts",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "levator scapulae",
    "pectorals",
    "quads",
    "serratus anterior",
    "spine",
    "traps",
    "triceps",
    "upper back"
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MuscleFilter = (props) => {
    const theme = useTheme();
    const [ targetList, setTargetList ] = useState(targets);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setTargetList(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        //console.log('targetList: ', targetList);
        props.targetMuscles(targetList);
    }, [targetList])

    return (
        <div>
            <FormControl className="form-control" sx={{m:1}}>
                <InputLabel>Target Muscles</InputLabel>
                <Select
                    multiple
                    value={targetList}
                    onChange={handleChange}
                    input={<OutlinedInput label="Target Muscles" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {targets.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, targetList, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MuscleFilter;