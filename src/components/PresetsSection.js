import React from 'react';
import {Container} from "@mui/material";
import Presets from "./Presets";
import PresetsDisabled from "./PresetsDisabled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";


const PresetsSection = (props) => {
    async function onLoadState() {
        props.loadState();
    }

    return (
        <Container>
            <Grid container>
                <Grid item>
                    <Typography variant="h5">
                        Load example routines:
                    </Typography>
                </Grid>
                <Grid item>
                    <Presets loadState={onLoadState}></Presets>
                </Grid>
                <Grid item>
                    <PresetsDisabled name="Upper/Lower Body Split"/>
                </Grid>
                <Grid item>
                    <PresetsDisabled name="Body Part Split"/>
                </Grid>
                <Grid item>
                    <PresetsDisabled name="Whole Body Split"/>
                </Grid>
            </Grid>

        </Container>
    )
}

export default PresetsSection;