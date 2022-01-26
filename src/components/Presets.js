import React from 'react';
import {Container} from "@mui/material";
import Button from "@mui/material/Button";

const Presets = (props) => {
    async function loadState(){
        props.loadState();
    }

    return (
        <Container>
            <Button align="center" variant="contained" onClick={loadState}>LOAD PUSH/PULL/LEGS SPLIT</Button>
        </Container>
    )
}

export default Presets;