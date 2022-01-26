import React from 'react';
import {Container} from "@mui/material";
import Button from "@mui/material/Button";

const PresetsDisabled = (props) => {
    return (
        <Container>
            <Button align="center" variant="disabled" >{props.name}</Button>
        </Container>
    )
}

export default PresetsDisabled;

