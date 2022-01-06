import React from 'react';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const SearchFilters = () => {
    return (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Back</Button>
            <Button>Cardio</Button>
            <Button>Chest</Button>
            <Button>Lower Arms</Button>
            <Button>Lower Legs</Button>
            <Button>Neck</Button>
            <Button>Shoulders</Button>
            <Button>Upper Arms</Button>
            <Button>Waist</Button>

        </ButtonGroup>
    )
}

export default SearchFilters;