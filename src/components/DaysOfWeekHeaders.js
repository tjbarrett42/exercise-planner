import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const DaysOfWeekHeaders = () => {
    const days = ['Exercises','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

    return (
      <Grid container columns={8}>
          {days.map((day,index) => {
              return (
                  <Grid item xs={1} key={index}>
                      <Typography variant="h5" align="center">
                          {day}
                      </Typography>
                  </Grid>
              )
          })}
      </Grid>
    );
}

export default DaysOfWeekHeaders;