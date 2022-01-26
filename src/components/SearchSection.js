import React from 'react';
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchBar from "./SearchBar";
import MuscleFilter from "./MuscleFilter";
import EquipmentFilter from "./EquipmentFilter";
import Typography from "@mui/material/Typography";

const SearchSection = (props) => {
    async function onTermSubmit(term){
        props.onTermSubmit(term);
    }

    async function onTargetSubmit(targetList){
        props.onTargetSubmit(targetList);
    }

    async function onEquipmentSubmit(equipmentList){
        props.onEquipmentSubmit(equipmentList);
    }

    return (
      <Grid container spacing={0}>
          <Grid container item xs={12} lg={4} direction="row"
                justifyContent="flex-start"
                alignItems="stretch">
              <Container>
                  <Grid item xs={12} lg={12}>
                      <SearchBar placeholder="Search exercise database" onFormSubmitToSB={onTermSubmit}/>
                  </Grid>

                  <Grid item xs={12} lg={12}>
                      <MuscleFilter targetMuscles={onTargetSubmit}/>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                      <EquipmentFilter equipmentToSS={onEquipmentSubmit}/>
                  </Grid>
              </Container>
          </Grid>
          <Grid container item xs={12} lg={8} direction="row"
                justifyContent="flex-start"
                alignItems="stretch">
              <Container>
                  <Typography variant="h5">
                      How to Use
                  </Typography>
                  <Typography component={'span'} variant="body1">
                      <p>
                          The Workout Split Planner is designed for visualizing day-to-day set volume, sorted by muscle group.
                      </p>
                      <p>
                          Exercises can be shown in the results column by querying in the search field, and filtered by target muscle or required equipment.
                          The exercise cards can be added to the seven columns by dragging and dropping them accordingly. The sets and reps can be configured for each exercise. More information can be found about the exercise by clicking on the information icon on the card.
                      </p>
                      <p>
                          Each column can be titled (such as 'Push', 'Pull', 'Legs') and can also be dragged to swap entire daily routines around your schedule.
                      </p>
                      <p>
                          The analysis section will graph your sets per day per target muscle. Recalculating this visualization can be done by clicking the 'Refresh Analysis' button.
                      </p>

                  </Typography>
              </Container>


          </Grid>

      </Grid>
    );
}

export default SearchSection;