import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import './EquipmentFilter.css';

const ITEM_HEIGHT = 94;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const equipment = [
    "assisted",
    "band",
    "barbell",
    "body weight",
    "bosu ball",
    "cable",
    "dumbbell",
    "elliptical machine",
    "ez barbell",
    "hammer",
    "kettlebell",
    "leverage machine",
    "medicine ball",
    "olympic barbell",
    "resistance band",
    "roller",
    "rope",
    "skierg machine",
    "sled machine",
    "smith machine",
    "stability ball",
    "stationary bike",
    "stepmill machine",
    "tire",
    "trap bar",
    "upper body ergometer",
    "weighted",
    "wheel roller"
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const EquipmentFilter = (props) => {
    const theme = useTheme();
    const [ equipmentList, setEquipmentList ] = useState([
        "barbell",
        "body weight",
        "cable",
        "dumbbell",
        "olympic barbell",
        "smith machine",
        "weighted",
    ]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setEquipmentList(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        //console.log('targetList: ', targetList);
        props.equipmentToSS(equipmentList);
    }, [equipmentList])

    return (
        <div>
            <FormControl className="form-control" sx={{m:1}}>
                <InputLabel>Equipment</InputLabel>
                <Select

                    multiple
                    value={equipmentList}
                    onChange={handleChange}
                    input={<OutlinedInput label="Equipment" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {equipment.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, equipmentList, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default EquipmentFilter;